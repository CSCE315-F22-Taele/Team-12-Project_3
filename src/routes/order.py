from flask import Blueprint, request
from ..models import db, Order, OrderMenu, Menu, MenuInventory, Inventory
from datetime import datetime
from uuid import uuid4

bp = Blueprint('orders', __name__, url_prefix='/orders')

# Adding order, will need Order, Item, & Ingredient
# TODO: Assign a random server
@bp.get('/')
def getOrders():
    notServed = ("not-served" in request.args)
    serverId = request.json.get("serverId")
    orderQuery = Order.query

    if notServed:
        orderQuery = orderQuery.filter_by(is_served=False)
    if serverId:
        orderQuery = orderQuery.filter_by(server_id=serverId)

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
    
    
    timeOrdered = datetime.now()
    newOrder = Order(
        id=str(uuid4()),
        customer_name=customerName,
        time_ordered=timeOrdered,
    )

    totalPrice = 0
    for itm in items:
        menuItem = menuMapping[itm.itemName]
        priceThisItem = menuItem.price * itm.quantity
        totalPrice += priceThisItem
        OrderMenu.insert().values(order_id=newOrder.id, 
                                 item_id=menuItem.item_id, 
                                 quantity=itm.quantity, 
                                 total_price=priceThisItem)

        # newOrder.menuItems.append(menuMapping.get(itm).item_name)
        newOrder.menuItems.append(menuMapping.get(itm.item_name))
        
    assert(len(newOrder.menuItems) == len(items)), "LENGTHS NOT EQUAL" # TODO: Throw a better error for anthony

    # TODO: fix server_id
    newOrder.server_id = "1"  
    newOrder.price = totalPrice
    db.session.add(newOrder)
    db.session.commit()
    
    return {
        "orderId": newOrder.id,
        "customerName": customerName,
        "serverId": "1",
        "timeOrdered": timeOrdered,
        "isServed": False,
        "price": totalPrice,
        "items": [
            {
                "itemName": itm.item_name, 
                "quantity": itm.quantity, 
                "totalPrice": orderMenu.total_price
            } 
            for itm, orderMenu in zip(items, newOrder.menuItems)
        ]
    }
        

@bp.put('/order/serve')
def serveOrder():
    orderId = request.json.get("orderId")
    assert orderId, "orderId not given!" # TODO: Throw a better error

    order = Order.query.get(orderId) # get used here instead because orderId is primary key
    print(order)
    print(order.is_served)
    assert order.is_served == False, "order already served!" # Throw a better error

    # Order.query().\
    #     filter(
            
    #         )

    db.session.query().\
        join(OrderMenu, Order.id).\
        join(MenuInventory, OrderMenu.item_id).\
        join(Inventory, MenuInventory.ingredient_id)

    return {}