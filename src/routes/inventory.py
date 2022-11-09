from flask import Blueprint, request
from ..models import db, Inventory

bp = Blueprint('inventory', __name__, url_prefix='/inventory')

# Get entire inventory
# Alternatively, get understocked ingredients if endpoint is ?restock-report
@bp.get("/")
def getInventory():
    understockCond = ('restock-report' in request.args)
    inventoryQuery = Inventory.query
    if understockCond:
        inventoryQuery = inventoryQuery.filter(Inventory.quantity < Inventory.threshold)
    inventoryIngredients = inventoryQuery.order_by(Inventory.ingredient_name.asc()).all()
    return {"ingredients": [inv.to_dict() for inv in inventoryIngredients]}

@bp.get("/ingredient") # /ingredient?ingredientName=""
def getInventoryIngredient():
    ingredientName = request.args.get("ingredientName")
    assert(ingredientName), "ingredientName not provided!"
    ingredient = Inventory.query.filter_by(ingredient_name=ingredientName).first()
    return ingredient.to_dict()

@bp.put("/restock")
def restockIngredients():
    allCondition = ("all" in request.args)
    ingredientsList = request.json.get("ingredients")
    if allCondition:
        allIngredients = Inventory.query.all()
        amount = request.json.get("amount")
        for ingredient in allIngredients:
            ingredient.quantity += amount
        countRestocked = len(allIngredients)
    elif ingredientsList:
        ingredientNameList = [ingredient['ingredientName'] for ingredient in ingredientsList]
        ingredientObjectsList = Inventory.query.filter(
                                    Inventory.ingredient_name.in_(ingredientNameList)
                                ).all()
        assert(len(ingredientsList) == len(ingredientObjectsList)), "LENGTHS DON'T MATCH" # TODO: Throw a better exception
        for ingredientObj, ingredientJson in zip(ingredientObjectsList, ingredientsList):
            amount = ingredientJson.get("amount")
            ingredientObj.quantity += amount
        countRestocked = len(ingredientNameList)
    else:
        return {"error"}, 400 # TODO: Throw a better exception

    db.session.commit()
    return {"countRestocked": countRestocked}

@bp.put("/threshold")
def updateThresholdIngredient():
    ingredientsList = request.json.get("ingredients")
    if ingredientsList:
        ingredientNameList = [ingredient['ingredientName'] for ingredient in ingredientsList]
        ingredientObjectsList = Inventory.query.filter(
                                    Inventory.ingredient_name.in_(ingredientNameList)
                                ).all()
        assert(len(ingredientsList) == len(ingredientObjectsList)), "LENGTHS DON'T MATCH" # TODO: Throw a better exception
        for ingredientObj, ingredientJson in zip(ingredientObjectsList, ingredientsList):
            newThreshold = ingredientJson.get("newThreshold")
            ingredientObj.threshold = newThreshold
        countChanged = len(ingredientNameList)
    else:
        return {"error"}, 400 # TODO: Throw a better exception

    db.session.commit()
    return {"countRestocked": countChanged}