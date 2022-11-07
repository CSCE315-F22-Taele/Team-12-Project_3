from flask import Blueprint, request
from ..models import db, Order, OrderMenu, Menu
from datetime import datetime
from uuid import uuid4

bp = Blueprint('orders', __name__, url_prefix='/orders')

# Adding order, will need Order, Item, & Ingredient
# TODO: Assign a random server
@bp.get('/')
def getOrders():
    notServed = ("not-served" in request.args)
    orderQuery = Order.query

    if notServed:
        orderQuery = orderQuery.filter_by(is_served=False)

    orders = orderQuery.order_by(Order.time_ordered.asc()).all()
    return {"orders": [order.to_dict() for order in orders]}


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
    customerName = request.json['customerName']
    items = request.json['items']
    
    
    newOrder = Order(customer_name = customerName)
    orderId = str(uuid4())
    totalPrice = 0
    timeOrdered = datetime.now()
    
    for itm in items:
        menuItem = menuMapping[itm.itemName]
        priceThisItem = menuItem.price * itm.quantity
        totalPrice += priceThisItem
        OrderMenu.insert().values(order_id=orderId, 
                                 item_id=menuItem.item_id, 
                                 quantity=itm.quantity, 
                                 total_price=priceThisItem)

        # newOrder.menuItems.append(menuMapping.get(itm).item_name)
        newOrder.menuItems.append(menuMapping.get(itm.item_name))
        
    newOrder.id = orderId
    # TODO: fix server_id
    newOrder.server_id = "1"  
    newOrder.time_ordered = timeOrdered
    newOrder.is_served = False
    newOrder.price = totalPrice
    db.session.add(newOrder)
    db.session.commit()
    
    return {
        "orderId": orderId,
        "customerName": customerName,
        "serverId": "1",
        "timeOrdered": timeOrdered,
        "isServed": False,
        "price": totalPrice,
        "items": [
            {"itemName": itm.item_name, 
             "quantity": itm.quantity, 
             "totalPrice": menuItem.total_price} for itm, menuItem in zip(items, OrderMenu.menuItems)]
        
    }
        
        