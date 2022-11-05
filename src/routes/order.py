from flask import Blueprint, request
from ..models import db, Order, OrderMenu, Menu

bp = Blueprint('order', __name__, url_prefix='/order')

# Adding order, will need Order, Item, & Ingredient
# TODO: Assign a random server
@bp.get('/')
def getOrders():
    notServed = ("not-served" in request.args)
    orderQuery = Order.query

    if notServed:
        orderQuery = orderQuery.filter_by(is_served=False)

    orders = orderQuery.options(db.joinedLoad(Menu.)).order_by(Order.time_ordered.asc()).all()
    return {"orders": [order.to_dict() for order in orders]}


    '''
    create order object
    for item in items:
        for ingredient in item.ingredients:
            insert into "ingredients" ingredient related to item.id, order.id
        insert into "items" item related to order.id
    insert into "orders" order

    create order object
    for item in items:
        insert into "items" item related to order.id
    insert into "orders" order
    '''