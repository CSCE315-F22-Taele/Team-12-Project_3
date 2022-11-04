from flask import Blueprint, request
from ..models import db, Inventory

bp = Blueprint('inventory', __name__, url_prefix='/inventory')

# Get entire inventory
# Alternatively, get understocked ingredients if endpoint is ?restock-report
@bp.get("/")
def getInventory():
    understockCond = request.args.get('restock-report')
    inventoryIngredients = Inventory.query.order_by(Inventory.ingredient_name.asc()).all()
    return {"ingredients": [inv.to_dict(understockCond) for inv in inventoryIngredients]}

@bp.get("/ingredient")
def getInventoryIngredient():
    ingredientName = request.json.get("ingredientName")
    ingredient = Inventory.query.filter_by(ingredient_name=ingredientName).first()
    return ingredient.to_dict()

@bp.put("/restock")
def restockIngredients():
    allCondition = request.args.get("all")
    ingredients = request.json.get("ingredients")
    if allCondition:
        pass
    elif ingredients:
        for ingredient_json in ingredients:
            ingredientName = request.json.get("ingredientName")
            amount = request.json.get("amount")
            ingredient = Inventory.query.filter_by(ingredient_name=ingredientName).first()
            ingredient.quantity += amount

        # TODO:
    else:
        return {"error"}, 400 # TODO

    db.session.commit()
    return # TODO: 

@bp.put("/threshold")
def updateThresholdIngredient():
    ingredientName = request.json.get("ingredientName")
    newThreshold = request.json.get("newThreshold")
    ingredient = Inventory.query.filter_by(ingredient_name=ingredientName).first()
    ingredient.threshold = newThreshold
    db.session.commit()
    return {"success": True}