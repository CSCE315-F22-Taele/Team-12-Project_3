from flask import Blueprint, request
from ..models import db, Inventory

bp = Blueprint('inventory', __name__, url_prefix='/inventory')

# Get entire inventory
# Alternatively, get one ingredient if endpoint is ?name=""
@bp.get("/")
def getInventory():
    name = request.args.get('name')
    if name is not None:
        name = name.replace("+", " ")
        inventoryIngredients = Inventory.query.filter_by(ingredient_name=name).all() # This returns 1, but within a list
    else:
        inventoryIngredients = Inventory.query.order_by(Inventory.ingredient_name.asc()).all()
    return {"inventory": [inv.to_dict() for inv in inventoryIngredients]}

# Add ingredient to inventory
@bp.post("/")
def createInventoryIngredient():
    name = request.json["name"]
    quantity = request.json["quantity"]
    threshold = request.json["threshold"]
    inventoryIngredient = Inventory(ingredient_name=name, 
                                     quantity=quantity, 
                                     threshold=threshold)

    db.session.add(inventoryIngredient)
    db.session.commit()
    
    return inventoryIngredient.to_dict()

@bp.put("/")
def restockSingleIngredient():
    pass

@bp.put("/")
def chThreshSingleIngredient():
    pass

@bp.put("/")
def restockAllIngredients():
    pass