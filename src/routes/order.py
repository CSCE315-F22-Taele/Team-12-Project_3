from flask import Blueprint, request
from ..models import db, Order, Item, Ingredient

bp = Blueprint('order', __name__, url_prefix='/order')

# Adding order, will need Order, Item, & Ingredient
# TODO: Assign a random server
'''
{
    customerName,
    items: [
        {
            itemName: str
            quantity: int
        },
        ...
    ]
}
'''
@bp.get('/')
def addOrder():
    customerName = request.json["name"]
    items = request.json["items"]

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

    for item in items:
        pass