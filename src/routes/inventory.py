from flask import Blueprint, request, abort, make_response, jsonify
from flask_restful import Api
from flask_apispec import use_kwargs, marshal_with, MethodResource, doc
from flask_jwt_extended import jwt_required
from marshmallow import fields
from webargs.flaskparser import parser
from ..models import db, Inventory
from ..schemas import (
    InventoryRequestSchema, InventoryResponseSchema, IngredientResponseSchema, 
    ReportSchema, RestockSchema, CountResponseSchema,
    SuccessSchema, ErrorSchema
)

bp = Blueprint('inventory', __name__, url_prefix='/inventory')
api = Api(bp)

@doc(tags=["Inventory"])
class RestockReportResource(MethodResource):
    # @jwt_required()
    @marshal_with(InventoryResponseSchema, code=200, description="Successfully retrieved restock-report")
    @doc(description="Retrieves all ingredients with quantity lower than threshold.")
    def get(self):
        inventoryIngredients = Inventory.query.filter(Inventory.quantity < Inventory.threshold).order_by(Inventory.ingredientName.asc()).all()
        return {"ingredients": inventoryIngredients}

# MethodResource inherits from both Methodview(Flask) & Resource(Flask-Restful)
@doc(tags=["Inventory"])
class InventoryResource(MethodResource):
    # @jwt_required()
    @marshal_with(InventoryResponseSchema, code=200, description="Successfully retrieved ingredients from inventory")
    @doc(description="Retrieves all the ingredients from the inventory.")
    def get(self):
        inventoryIngredients = Inventory.query.order_by(Inventory.ingredientName.asc()).all()
        return {"ingredients": inventoryIngredients}

    # @jwt_required()
    @use_kwargs(RestockSchema) # defaults to looking at the json
    @marshal_with(CountResponseSchema, code=202, description="Successfully restocked all ingredients")
    @marshal_with(ErrorSchema, code=400, description="Invalid Request Body")
    @marshal_with(ErrorSchema, code=422, description="Parsing Validation Error")
    @doc(description="Restocks all ingredients by a given amount")
    def put(self, amount):
        ingredients = Inventory.query.all()
        if amount is None:
            return make_response(jsonify(error="Invalid Request Body"), 400)

        for ingredient in ingredients:
            ingredient.quantity += amount
        db.session.commit()
        return {"countRestocked": len(ingredients)}

    # @jwt_required()
    @use_kwargs(InventoryRequestSchema) # defaults to looking at the json
    @marshal_with(CountResponseSchema, code=202, description="Successfully updated provided ingredients in the inventory")
    @marshal_with(ErrorSchema, code=400, description="Invalid Request Body")
    @marshal_with(ErrorSchema, code=422, description="Parsing Malfunction")
    @doc(description="Batch updates specified ingredients given the amount and/or threshold. Amount is added while newThreshold is set.")
    def patch(self, ingredients):
        if ingredients:
            ingredientNameList = [ingredient['ingredientName'] for ingredient in ingredients]
            ingredientObjectsList = Inventory.query.filter(
                                        Inventory.ingredientName.in_(ingredientNameList)
                                    ).all()

            if len(ingredients) != len(ingredientObjectsList):
                return make_response(jsonify(error="Consistency Error With IngredientList! Either db stale, or ingredientName passed in nonexistent!"), 400)

            for ingredientObj, ingredientJson in zip(ingredientObjectsList, ingredients):
                newThreshold = ingredientJson.get("newThreshold", ingredientObj.threshold) # new threshold, default old
                amountToRestock = ingredientJson.get("amount", 0) # amount to add, default 0
                ingredientObj.threshold = newThreshold
                ingredientObj.quantity += amountToRestock
        else:
            return make_response(jsonify(error="Invalid Request Body"), 400)

        db.session.commit()
        return make_response(jsonify(countUpdated=len(ingredients)), 202)

    @parser.error_handler
    def handle_request_parsing_error(err, req, schema, error_status_code, error_headers):
        abort(make_response(jsonify(error=err.messages.get('json') or err.messages.get('query')), 422))

# A second resource because of how rest handles stuff(annoying af)
@doc(tags=["Inventory"])
class IngredientResource(MethodResource):

    # @jwt_required()
    @marshal_with(IngredientResponseSchema, code=200, description="Ingredient Successfully Retrieved")
    @marshal_with(ErrorSchema, code=404, description="Ingredient Not Found")
    @doc(description="Get a specific ingredient from the inventory")
    def get(self, ingredientName=None):
        ingredient = Inventory.query.filter_by(ingredientName=ingredientName).first()
        if ingredient is None:
            return make_response(jsonify(error="Ingredient Not Found In Database!"), 404)
        return ingredient

    # @jwt_required()
    @marshal_with(SuccessSchema, code=202, description="Ingredient Successfully Deleted")
    @marshal_with(ErrorSchema, code=404, description="Ingredient Not Found")
    @doc(description="Delete an existing ingredient from database")
    def delete(self, ingredientName=None):
        ingredient = Inventory.query.filter_by(ingredientName=ingredientName).first()
        if ingredient is None:
            return make_response(jsonify(error="Ingredient Not Found In Database!"), 404)
        Inventory.query.filter_by(ingredientName=ingredientName).delete()
        db.session.commit()
        return {"success": True}, 202

restock_view = RestockReportResource.as_view("restockreportresource")
inventory_view = InventoryResource.as_view("inventoryresource")
ingredient_view = IngredientResource.as_view("ingredientresource")
bp.add_url_rule('/', view_func=inventory_view, methods=['GET'])
bp.add_url_rule('/restock-all', view_func=inventory_view, methods=['PUT'])
bp.add_url_rule('/update', view_func=inventory_view, methods=['PATCH'])
bp.add_url_rule('/ingredient/<string:ingredientName>', view_func=ingredient_view, methods=["GET", "DELETE"])
bp.add_url_rule('/restock-report', view_func=restock_view, methods=['GET'])