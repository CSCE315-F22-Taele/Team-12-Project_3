from flask import request, Blueprint, abort, make_response, jsonify
from flask_restful import Api
from flask_apispec import use_kwargs, marshal_with, MethodResource, doc
from webargs.flaskparser import parser
from marshmallow import fields
from ..models import db, Menu, MenuInventory, Inventory
from uuid import uuid4
from ..schemas import (
    DescriptionSchema,
    ItemResponseSchema, MenuResponseSchema,
    ErrorSchema
)

bp = Blueprint('menu', __name__, url_prefix='/menu')
api = Api(bp)

@doc(tags=["Menu"])
class MenuResource(MethodResource):

    @use_kwargs(DescriptionSchema, location='query')
    @marshal_with(MenuResponseSchema, code=200, description="Successfully retrieved items from menu")
    @marshal_with(ErrorSchema, code=400, description="Query Parameter Not Allowed")
    @doc(description="Retrieves all the items from the menu. Optionally, pass in descriptions parameter to include menu descriptions.")
    def get(self, *args):
        includeDescripts = ('description' in request.args)
        if includeDescripts == False and len(request.args) > 0: # invalid query parameter passed
            return make_response(jsonify(error="Invalid Query Parameters!"), 400)
        menuItems = Menu.query.order_by(Menu.itemName.asc()).all()
        return {"items": [itm.to_dict(includeDescripts) for itm in menuItems]}

    @parser.error_handler
    def handle_request_parsing_error(err, req, schema, error_status_code, error_headers):
        abort(make_response(jsonify(error="Invalid Query Parameter! Did you mean '?description'?"), 400))

@doc(tags=["Menu"])
class ItemResource(MethodResource):

    @marshal_with(ItemResponseSchema, code=200, description="Item Successfully Retrieved")
    @marshal_with(ErrorSchema, code=404, description="Item Not Found")
    @doc(description="Get a specific item from the menu")
    def get(self, itemName):
        menuItem = Menu.query.filter_by(itemName=itemName).first()
        if menuItem is None:
            return make_response(jsonify(error="Item Not Found In Database!"), 404)
        return menuItem # Will return defaults as well

    @marshal_with(None, code=204, description="Item Successfully Deleted")
    @marshal_with(ErrorSchema, code=404, description="Item Not Found")
    @doc(description="Delete an existing item from the menu")
    def delete(self, itemName):
        item = Menu.query.filter_by(itemName=itemName).first()
        if item is None:
            return make_response(jsonify(error="Item Not Found In Database!"), 404)
        db.session.commit()
        return {"success": True}

menu_view = MenuResource.as_view("menuresource")
item_view = ItemResource.as_view("itemresource")
bp.add_url_rule("/", view_func=menu_view, methods=["GET"])
bp.add_url_rule("/item/<string:itemName>", view_func=item_view, methods=["GET", "DELETE"])



# @bp.post('/item')
# def addMenuItem():
#     itemName = request.json['itemName']
#     description = request.json['description']
#     price = request.json['price']
#     linkedInventory = request.json['linkedInventory'] # list of strings

#     inventory = Inventory.query.all() # NOTE: EXTREMELY INEFFICIENT, CHANGE LATER
#     inventoryMapping = {inv.ingredientName: inv for inv in inventory}

#     newCounts = 0
#     menuItem = Menu(
#         itemId=str(uuid4()),
#         itemName=itemName, 
#         description=description, 
#         price=price
#     )
#     for ingredientName in linkedInventory:
#         if ingredientName not in inventoryMapping:
#             ingredient = Inventory(
#                     ingredientId=str(uuid4()),
#                     ingredientName=ingredientName,
#                 )
#             db.session.add(ingredient) # Doesn't actually run the query yet, more like "stages" them for the commit
#             newCounts += 1
#             inventoryMapping[ingredientName] = ingredient
#         inv = inventoryMapping.get(ingredientName)
#         MenuInventory.insert().values(item_id=menuItem.itemId, ingredient_id=inv.ingredientId)
#         menuItem.menuIngredients.append(inv)

#     db.session.add(menuItem)
#     db.session.commit()

#     return {
#         "itemCreated": 1,
#         "ingredientsLinked": len(linkedInventory),
#         "newIngredientsCreated": newCounts
#     }

# # Put has same behavior always, assumes you pass in a complete entity & that it replaces existing entity in db
# @bp.put('/item/price')
# def updateMenuItemPrice():
#     itemName = request.json["itemName"]
#     newPrice = request.json["newPrice"]

#     menuItem = Menu.query.filter_by(itemName=itemName).first()
#     if menuItem is None:
#         return None, # TODO: Error Code
#     menuItem.price = newPrice
#     db.session.commit()
#     return {"success": True}