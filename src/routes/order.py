from flask import Blueprint, request
from ..models import db, Order, OrderMenu, Menu

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