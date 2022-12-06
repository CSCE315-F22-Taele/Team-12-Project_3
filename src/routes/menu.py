from flask import request, Blueprint, abort, make_response, jsonify
from flask_restful import Api
from flask_apispec import use_kwargs, marshal_with, MethodResource, doc
from flask_jwt_extended import jwt_required
from webargs.flaskparser import parser
from marshmallow import fields
from ..models import db, Menu, MenuInventory, Inventory
from uuid import uuid4
from ..schemas import (
    DescriptionSchema, NewPriceRequestSchema, ItemRequestSchema,
    ItemResponseSchema, MenuResponseSchema, PostResponseSchema,
    SuccessSchema, ErrorSchema
)
from sqlalchemy.exc import IntegrityError
from psycopg2.errors import UniqueViolation

bp = Blueprint('menu', __name__, url_prefix='/menu')
api = Api(bp)

@doc(tags=["Menu"])
class MenuResource(MethodResource):

    @use_kwargs(DescriptionSchema, location='query')
    @marshal_with(MenuResponseSchema, code=200, description="Successfully retrieved items from menu")
    @marshal_with(ErrorSchema, code=400, description="Query Parameter Not Allowed")
    @doc(description="Retrieves all the items from the menu. Optionally, pass in descriptions parameter to include menu descriptions.")
    def get(self, *args):
        includeDescripts = ('descriptions' in request.args)
        if includeDescripts == False and len(request.args) > 0: # invalid query parameter passed
            return make_response(jsonify(error="Invalid Query Parameters!"), 400)
        menuItems = Menu.query.filter_by(active=True).order_by(Menu.itemName.asc()).all()
        return {"items": [itm.to_dict(includeDescripts) for itm in menuItems]}

@doc(tags=["Menu"])
class ItemResource(MethodResource):
    @marshal_with(ItemResponseSchema, code=200, description="Item Successfully Retrieved")
    @marshal_with(ErrorSchema, code=404, description="Item Not Found")
    @doc(description="Get a specific item from the menu")
    def get(self, itemName):
        menuItem = Menu.query.filter_by(itemName=itemName, active=True).first()
        if menuItem is None:
            return make_response(jsonify(error="Item Not Found In Database!"), 404)
        return menuItem # Will return defaults as well

    # @jwt_required() 
    @marshal_with(SuccessSchema, code=202, description="Item Successfully Deleted")
    @marshal_with(ErrorSchema, code=404, description="Item Not Found")
    @doc(description="Delete an existing item from the menu by making it inactive")
    def delete(self, itemName):
        item = Menu.query.filter_by(itemName=itemName, active=True).first()
        if item is None:
            return make_response(jsonify(error="Item Not Found In Database!"), 404)
        item.active = False # Changing item active status instead of deleting it
        db.session.commit()
        return {"success": True}, 202

    # @jwt_required()
    @use_kwargs(NewPriceRequestSchema) # defaults to looking at the json
    @marshal_with(SuccessSchema, code=202, description="Successfully Updated Item Price")
    @marshal_with(ErrorSchema, code=404, description="Invalid Request Body")
    @marshal_with(ErrorSchema, code=422, description="Parsing Malfunction")
    @doc(description="Batch updates specified ingredients given the amount and/or threshold. Amount is added while newThreshold is set.")
    def patch(self, itemName, newPrice):
        menuItem = Menu.query.filter_by(itemName=itemName, active=True).first()
        if menuItem is None:
            return make_response(jsonify(error="Item Not Found!"), 404)
        menuItem.price = newPrice
        db.session.commit()
        return {"success": True}, 202

    # @jwt_required()
    @use_kwargs(ItemRequestSchema) # defaults to looking at the json
    @marshal_with(PostResponseSchema, code=201, description="Successfully Created Item")
    @marshal_with(ErrorSchema, code=404, description="Invalid Request Body")
    @marshal_with(ErrorSchema, code=422, description="Parsing Malfunction")
    @doc(description="Adds a new item and its associated ingredients to the database. Creates new ingredients if non-existent")
    def post(self, itemName, description, price, linkedInventory):
        '''
        itemName: str
        description: str
        price: float
        linkedInventory: list(str)
        '''
        inventory = Inventory.query.all()
        inventoryMapping = {inv.ingredientName: inv for inv in inventory}

        newIngredients = []
        menuItemExists = Menu.query.filter_by(itemName=itemName).first()
        if menuItemExists is not None:
            if menuItemExists.active:
                return make_response(jsonify(error="Duplicate Item!"), 404)
            else: # Updating the item should it be inactive
                menuItem = menuItemExists
                menuItem.active = True
                menuItem.description = description
                menuItem.price = price
                menuItem.menuIngredients = []
        else:
            menuItem = Menu(
                itemId=str(uuid4()),
                itemName=itemName, 
                description=description, 
                price=price
            )

        for ingredientName in linkedInventory:
            if ingredientName not in inventoryMapping:
                ingredient = Inventory(
                        ingredientId=str(uuid4()),
                        ingredientName=ingredientName,
                    )
                db.session.add(ingredient) # Doesn't actually run the query yet, more like "stages" them for the commit
                newIngredients.append(ingredientName)
                inventoryMapping[ingredientName] = ingredient
            inv = inventoryMapping.get(ingredientName)
            MenuInventory.insert().values(item_id=menuItem.itemId, ingredient_id=inv.ingredientId)
            menuItem.menuIngredients.append(inv)

        db.session.add(menuItem)
        db.session.commit()

        return {
            "itemCreated": menuItem.itemName,
            "ingredientsLinked": len(linkedInventory),
            "newIngredientsCreated": newIngredients
        }, 201

    @parser.error_handler
    def handle_request_parsing_error(err, req, schema, error_status_code, error_headers):
        abort(make_response(jsonify(error=err.messages.get('json') or err.messages.get('query')), 422))

menu_view = MenuResource.as_view("menuresource")
item_view = ItemResource.as_view("itemresource")
bp.add_url_rule("/", view_func=menu_view, methods=["GET"])
bp.add_url_rule("/item", view_func=item_view, methods=["POST", "PATCH"])
bp.add_url_rule("/item/<string:itemName>", view_func=item_view, methods=["GET", "DELETE"])