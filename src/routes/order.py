from flask import Blueprint, request, abort, make_response, jsonify
from flask_restful import Api
from flask_apispec import use_kwargs, marshal_with, MethodResource, doc
from marshmallow import fields
from webargs.flaskparser import parser
from sqlalchemy import and_, or_, func
from datetime import datetime
from uuid import uuid4

from ..models import db, Order, OrderMenu, Menu, MenuInventory, Inventory
from ..schemas import (
    SalesRequestSchema, SalesResponseSchema,
    ExcessRequestSchema, ExcessResponseSchema,
    SuccessSchema, ErrorSchema
)

bp = Blueprint('orders', __name__, url_prefix='/orders')
api = Api(bp)

@doc(tags=["Order"])
class SalesReportResource(MethodResource):

    @use_kwargs(SalesRequestSchema)
    @marshal_with(SalesResponseSchema, code=200, description="Retrieves sales-report for all items in the menu.")
    @doc(description="Get sales by item from order history given startDate & endDate. Dates must be in '%Y-%m-%d' format!")
    def get(self, startDate, endDate):
        # NOTE: outerjoin is used because if no conditions match it will insert anyway
        #       but with some values nulled out. This allows you to get menu items that didn't
        #       appear in the inventory.
        salesReport = db.session.query(
                        Menu.itemName, 
                        func.sum(OrderMenu.quantity), 
                        func.sum(OrderMenu.total_price)
                    ).\
                        outerjoin(OrderMenu, Menu.itemId == OrderMenu.item_id).\
                        outerjoin(Order, 
                            and_(
                                    Order.id == OrderMenu.order_id,
                                    Order.time_ordered >= startDate,
                                    Order.time_ordered <= endDate
                                )
                            ).\
                        group_by(Menu.itemId).\
                        order_by(Menu.itemName).\
                        all()
                        
        return {
            "items": [
                {
                    "itemName": itemName,
                    "sales": sales or 0,        # Because some items didn't appear in orders, they will be null
                    "revenue": revenue or 0     # Thus, by doing this it's either a value or defaulted to 0
                }
                for itemName, sales, revenue in salesReport
            ]
        }

@doc(tags=["Order"])
class ExcessReportResource(MethodResource):
    @use_kwargs(ExcessRequestSchema)
    @marshal_with(ExcessResponseSchema, code=200, description="Retrieves excess-report according to orders.")
    @doc(description="Get items where respective item's sales < .1*inventory using order history given startDate. Date must be in '%Y-%m-%d' format!")
    def get(self, startDate):
        omAfterTime = db.session.query(
                        OrderMenu.quantity,
                        OrderMenu.item_id
                    ).\
                        select_from(Order).\
                        outerjoin(OrderMenu,
                            and_ (
                                    Order.time_ordered >= startDate,
                                    OrderMenu.order_id == Order.id
                            )
                        ).\
                        subquery()
        excessReport = db.session.query(
                        func.distinct(Menu.itemId),
                        Menu.itemName, 
                        func.sum(omAfterTime.c.quantity)
                    ).\
                        outerjoin(omAfterTime, Menu.itemId == omAfterTime.c.item_id).\
                        outerjoin(MenuInventory, Menu.itemId == MenuInventory.c.item_id).\
                        outerjoin(Inventory, MenuInventory.c.ingredient_id == Inventory.ingredientId).\
                        group_by(Inventory.ingredientId, Menu.itemId).\
                        having(
                            or_ (
                                func.sum(omAfterTime.c.quantity) < Inventory.quantity * 0.1,
                                func.sum(omAfterTime.c.quantity).is_(None)
                            )
                        ).\
                        order_by(Menu.itemName).\
                        all()
        return {
            "items": [
                {
                    "itemId": itemId,
                    "itemName": itemName,
                    "sales": sales or 0
                } for itemId, itemName, sales in excessReport
            ]
        }

sales_view = SalesReportResource.as_view("salesreportresource")
excess_view = ExcessReportResource.as_view("excessreportresource")
bp.add_url_rule('/items/sales-report', view_func=sales_view, methods=['GET'])
bp.add_url_rule('/items/excess-report', view_func=excess_view, methods=['GET'])

# Adding order, will need Order, Item, & Ingredient
# TODO: Assign a random server
@bp.get('/')
def getOrders():
    notServed = ("not-served" in request.args)
    serverId = request.args.get("serverId")
    orderQuery = Order.query

    if notServed:
        orderQuery = orderQuery.filter_by(is_served=False)
    if serverId:
        orderQuery = orderQuery.filter_by(server_id=serverId)

    orders = orderQuery.order_by(Order.time_ordered.asc()).all()
    return {"orders": [order.to_dict() for order in orders]}

@bp.post("/order")
def createOrder():
    menu = Menu.query.all() # Very inefficient
    menuMapping = {itm.itemName: itm for itm in menu}
    customerName = request.json.get('customerName')
    items = request.json.get('items')
    serverId = request.json.get('serverId')

    assert(customerName and items), "customerName or items not provided!"
    assert(not serverId or (isinstance(serverId, str) and len(serverId) >= 36)), "serverId provided is invalid"
    
    timeOrdered = datetime.now()
    newOrder = Order(
        id=str(uuid4()),
        customer_name=customerName,
        time_ordered=timeOrdered,
    )

    totalPrice = 0
    prices = []
    for itm in items:
        menuItem = menuMapping[itm.get("itemName")]
        priceThisItem = menuItem.price * itm.get("quantity")
        totalPrice += priceThisItem
        prices.append(priceThisItem)
        db.session.add(OrderMenu(
            order_id=newOrder.id, 
            item_id=menuItem.itemId, 
            quantity=itm.get("quantity"), 
            total_price=priceThisItem
        ))

    if serverId is None:
        pass # Implement random serverId here
    newOrder.server_id = serverId or "1"  
    newOrder.price = totalPrice
    db.session.add(newOrder)
    db.session.commit()
    
    return {
        "orderId": newOrder.id,
        "customerName": customerName,
        "serverId": serverId,
        "timeOrdered": timeOrdered,
        "isServed": False,
        "price": totalPrice,
        "items": [
            {
                "itemName": itm.get("itemName"), 
                "quantity": itm.get("quantity"), 
                "totalPrice": price
            } 
            for itm, price in zip(items, prices)
        ]
    }
        

@bp.put('/order/serve')
def serveOrder():
    orderId = request.json.get("orderId")
    assert orderId, "orderId not given!" # TODO: Throw a better error

    order = Order.query.get(orderId) # get used here instead because orderId is primary key
    assert order.is_served == False, "order already served!" # Throw a better error

    inventoryQuery = db.session.query(Inventory, OrderMenu.quantity).\
                    select_from(Order).\
                    join(
                        OrderMenu, 
                        and_(Order.id == OrderMenu.order_id, Order.id == orderId)).\
                    join(MenuInventory, OrderMenu.item_id == MenuInventory.columns.item_id).\
                    join(Inventory, MenuInventory.columns.ingredient_id==Inventory.ingredientId)
    orderIngredients = db.session.execute(inventoryQuery)
    
    ingredientsUsed = [] # list of dicts
    for inventoryObj, amtUsed in orderIngredients:
        inventoryObj.quantity -= amtUsed
        ingredientsUsed.append(
                {
                    "ingredientName": inventoryObj.ingredientName,
                    "amountRemoved": amtUsed,
                }
            )

    order.is_served = True
    db.session.commit()

    return {"ingredientsUsed": ingredientsUsed}