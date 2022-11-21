from flask import Blueprint, request, abort, make_response, jsonify
from flask_restful import Api
from flask_apispec import use_kwargs, marshal_with, MethodResource, doc
from marshmallow import fields
from webargs.flaskparser import parser
from ..models import db, Inventory
from ..schemas import (
    InventoryRequestSchema, InventoryResponseSchema, 
    IngredientRequestSchema, IngredientResponseSchema, 
    ErrorSchema, RestockSchema
)

bp = Blueprint('inventory', __name__, url_prefix='/inventory')
api = Api(bp)

# MethodResource inherits from both Methodview(Flask) & Resource(Flask-Restful)
@doc(tags=["Inventory"])
class InventoryResource(MethodResource):

    @use_kwargs(RestockSchema, location='query') # Solely just so swagger is documented; Don't need to understand
    @marshal_with(InventoryResponseSchema, code=200, description="Successfully retrieved ingredients from inventory")
    @marshal_with(ErrorSchema, code=400, description="Query Paramater Not Allowed")
    @doc(description="Retrieves all the ingredients from the inventory. Optionally, retrives all ingredients with quantity lower than threshold.")
    def get(self, *args):
        understockCond = ('restock-report' in request.args)
        inventoryQuery = Inventory.query
        if understockCond:
            inventoryQuery = inventoryQuery.filter(Inventory.quantity < Inventory.threshold)
        elif len(request.args) > 0: # invalid query parameter passed
            return make_response(jsonify(error="Invalid Query Parameters!"), 400)
        inventoryIngredients = inventoryQuery.order_by(Inventory.ingredient_name.asc()).all()
        return {"ingredients": inventoryIngredients}

    def put(self, *args):
        pass

    @use_kwargs(InventoryRequestSchema) # defaults to looking at the json
    @marshal_with(InventoryResponseSchema, code=202, description="Successfully updated provided ingredients in the inventory")
    @marshal_with(ErrorSchema, code=400, description="Query Paramater Not Allowed")
    @doc(description="Batch updates specified ingredients given the amount and/or threshold. Amount is added while newThreshold is set.")
    def patch(self, ingredients):
        if ingredients:
            ingredientNameList = [ingredient['ingredientName'] for ingredient in ingredients]
            ingredientObjectsList = Inventory.query.filter(
                                        Inventory.ingredient_name.in_(ingredientNameList)
                                    ).all()

            if len(ingredients) != len(ingredientObjectsList):
                return make_response(jsonify(error="Consistency Error With IngredientList! Either db stale, or ingredientName passed in nonexistent!"), 400) # TODO: different error should occur here?

            for ingredientObj, ingredientJson in zip(ingredientObjectsList, ingredients):
                newThreshold = ingredientJson.get("newThreshold", ingredientObj.threshold) # new threshold, default old
                amountToRestock = ingredientJson.get("amount", 0) # amount to add, default 0
                ingredientObj.threshold = newThreshold
                ingredientObj.quantity += amountToRestock
        else:
            return make_response(jsonify(error="Invalid Request Body"), 400)

        db.session.commit()
        return {"countUpdated": len(ingredients)}, 202

    @parser.error_handler
    def handle_request_parsing_error(err, req, schema, error_status_code, error_headers):
        abort(make_response(jsonify(error=err.messages.get('json')), 422))

# A second resource because of how rest handles stuff(annoying af)
@doc(tags=["Inventory"])
class IngredientResource(MethodResource):

    @marshal_with(IngredientResponseSchema, code=200, description="Ingredient Successfully Retrieved")
    @marshal_with(ErrorSchema, code=404, description="Ingredient Not Found")
    @doc(description="Get a specific ingredient from the inventory")
    def get(self, ingredientName=None):
        ingredient = Inventory.query.filter_by(ingredient_name=ingredientName).first()
        if ingredient is None:
            return make_response(jsonify(error="Ingredient Not Found In Database!"), 404)
        return ingredient

    @marshal_with(IngredientResponseSchema, code=204, description="Ingredient Successfully Deleted")
    @marshal_with(ErrorSchema, code=404, description="Ingredient Not Found")
    @doc(description="Delete an existing ingredient from database")
    def delete(self, ingredientName=None):
        ingredient = Inventory.query.filter_by(ingredient_name=ingredientName).first()
        if ingredient is None:
            return make_response(jsonify(err="Ingredient Not Found In Database!"), 404)
        Inventory.query.filter_by(ingredient_name=ingredientName).delete()
        db.session.commit()
        return {}, 204

inventory_view = InventoryResource.as_view("inventoryresource")
ingredient_view = IngredientResource.as_view("ingredientresource")
bp.add_url_rule('/', view_func=inventory_view)
bp.add_url_rule('/update', view_func=inventory_view, methods=['PATCH'])
bp.add_url_rule('/ingredient/<string:ingredientName>', view_func=ingredient_view, methods=["GET", "DELETE"])
# bp.add_url_rule('/user', view_func=user_view, methods=['POST'])

# Get entire inventory
# Alternatively, get understocked ingredients if endpoint is ?restock-report
# @bp.get("/")
# def getInventory():
#     understockCond = ('restock-report' in request.args)
#     inventoryQuery = Inventory.query
#     if understockCond:
#         inventoryQuery = inventoryQuery.filter(Inventory.quantity < Inventory.threshold)
#     inventoryIngredients = inventoryQuery.order_by(Inventory.ingredient_name.asc()).all()
#     return {"ingredients": [inv.to_dict() for inv in inventoryIngredients]}

# @bp.get("/ingredient") # /ingredient?ingredientName=""
# def getInventoryIngredient():
#     ingredientName = request.args.get("ingredientName")
#     assert(ingredientName), "ingredientName not provided!"
#     ingredient = Inventory.query.filter_by(ingredient_name=ingredientName).first()
#     return ingredient.to_dict()

# @bp.put("/restock")
# def restockIngredients():
#     allCondition = ("all" in request.args)
#     ingredientsList = request.json.get("ingredients")
#     if allCondition:
#         allIngredients = Inventory.query.all()
#         amount = request.json.get("amount")
#         for ingredient in allIngredients:
#             ingredient.quantity += amount
#         countRestocked = len(allIngredients)
#     elif ingredientsList:
#         ingredientNameList = [ingredient['ingredientName'] for ingredient in ingredientsList]
#         ingredientObjectsList = Inventory.query.filter(
#                                     Inventory.ingredient_name.in_(ingredientNameList)
#                                 ).all()
#         assert(len(ingredientsList) == len(ingredientObjectsList)), "LENGTHS DON'T MATCH" # TODO: Throw a better exception
#         for ingredientObj, ingredientJson in zip(ingredientObjectsList, ingredientsList):
#             amount = ingredientJson.get("amount")
#             ingredientObj.quantity += amount
#         countRestocked = len(ingredientNameList)
#     else:
#         return {"error"}, 400 # TODO: Throw a better exception

#     db.session.commit()
#     return {"countRestocked": countRestocked}

# @bp.put("/threshold")
# def updateThresholdIngredient():
#     ingredientsList = request.json.get("ingredients")
#     if ingredientsList:
#         ingredientNameList = [ingredient['ingredientName'] for ingredient in ingredientsList]
#         ingredientObjectsList = Inventory.query.filter(
#                                     Inventory.ingredient_name.in_(ingredientNameList)
#                                 ).all()
#         assert(len(ingredientsList) == len(ingredientObjectsList)), "LENGTHS DON'T MATCH" # TODO: Throw a better exception
#         for ingredientObj, ingredientJson in zip(ingredientObjectsList, ingredientsList):
#             newThreshold = ingredientJson.get("newThreshold")
#             ingredientObj.threshold = newThreshold
#         countChanged = len(ingredientNameList)
#     else:
#         return {"error"}, 400 # TODO: Throw a better exception

#     db.session.commit()
#     return {"countRestocked": countChanged}