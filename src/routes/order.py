from flask import Blueprint, request
from src.models import db, Order, OrderMenu, Menu, MenuInventory, Inventory
from sqlalchemy import and_, or_, func
from datetime import datetime
from uuid import uuid4

bp = Blueprint('orders', __name__, url_prefix='/orders')

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

@bp.get("/items/sales-report")
def getSalesReport():
    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')
    assert (startDate and endDate), "startDate or endDate not provided"

    startDateFormatted = datetime.strptime(startDate, '%Y-%m-%d')
    endDateFormatted = datetime.strptime(endDate, '%Y-%m-%d')
    assert (endDateFormatted >= startDateFormatted), "endDate lies before startDate"

    # NOTE: outerjoin is used because if no conditions match it will insert anyway
    #       but with some values nulled out. This allows you to get menu items that didn't
    #       appear in the inventory.
    salesReport = db.session.query(
                    Menu.item_name, 
                    func.sum(OrderMenu.quantity), 
                    func.sum(OrderMenu.total_price)
                ).\
                    outerjoin(OrderMenu, Menu.item_id == OrderMenu.item_id).\
                    outerjoin(Order, 
                        and_(
                                Order.id == OrderMenu.order_id,
                                Order.time_ordered >= startDateFormatted,
                                Order.time_ordered <= endDateFormatted
                            )
                        ).\
                    group_by(Menu.item_id).\
                    order_by(Menu.item_name).\
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

@bp.get("/items/excess-report")
def getExcessReport():
    startDateStr = request.args.get("startDate")    # get provided time as string
    endDate = datetime.now()                        # get current time (upper bound on interval)
    assert(startDateStr), "startDate not provided"

    startDate = datetime.strptime(startDateStr, "%Y-%m-%d")
    assert(endDate >= startDate), "startDate later than current time"

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
                    func.distinct(Menu.item_id),
                    Menu.item_name, 
                    func.sum(omAfterTime.c.quantity)
                ).\
                    outerjoin(omAfterTime, Menu.item_id == omAfterTime.c.item_id).\
                    outerjoin(MenuInventory, Menu.item_id == MenuInventory.c.item_id).\
                    outerjoin(Inventory, MenuInventory.c.ingredient_id == Inventory.ingredient_id).\
                    group_by(Inventory.ingredient_id, Menu.item_id).\
                    having(
                        or_ (
                            func.sum(omAfterTime.c.quantity) < Inventory.quantity * 0.1,
                            func.sum(omAfterTime.c.quantity).is_(None)
                        )
                    ).\
                    order_by(Menu.item_name).\
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

'''
menu = Menu.query.all() # NOTE: EXTREMELY INEFFICIENT, CHANGE LATER
menuMapping = {itm.item_name: itm for itm in menu}

Create order object (customerName): Order(customer_name=customerName)
Loop through linkedItems:
    We get the item's id using menuMapping and itemName as key
    We calculate the totalPrice using item's price and inputted amount
    We insert into OrderMenu the (order_id, item_id, input_amount, totalPrice)
    We append the item object to order. (see line 55 in menu.py)

Add order to db.session
Commit order
'''
@bp.post("/order")
def createOrder():
    menu = Menu.query.all()
    menuMapping = {itm.item_name: itm for itm in menu}
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
            item_id=menuItem.item_id, 
            quantity=itm.get("quantity"), 
            total_price=priceThisItem
        ))

    # TODO: fix server_id
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
                    join(Inventory, MenuInventory.columns.ingredient_id==Inventory.ingredient_id)
    orderIngredients = db.session.execute(inventoryQuery)
    
    ingredientsUsed = [] # list of dicts
    for inventoryObj, amtUsed in orderIngredients:
        inventoryObj.quantity -= amtUsed
        ingredientsUsed.append(
                {
                    "ingredientName": inventoryObj.ingredient_name,
                    "amountRemoved": amtUsed,
                }
            )

    order.is_served = True
    db.session.commit()

    return {"ingredientsUsed": ingredientsUsed}