from flask import Blueprint, request
from ..models import db, Inventory

bp = Blueprint('inventory', __name__, url_prefix='/inventory')

# Get entire inventory
# Optionally, get one if endpoint is ?name=""
@bp.get("/")
def get_inventory():
    name = request.args.get('name')
    if name is not None:
        name = name.replace("+", " ")
        inventory_ingredients = Inventory.query.filter_by(ingredient_name=name).all() # Should just be one
    else:
        inventory_ingredients = Inventory.query.order_by(Inventory.ingredient_name.asc()).all()
    return {"inventory": [inv.to_dict() for inv in inventory_ingredients]}    

# Add ingredient to inventory
@bp.post("/")
def create_inventory_ingredient():
    name = request.json["name"]
    quantity = request.json["quantity"]
    threshold = request.json["threshold"]
    inventory_ingredient = Inventory(ingredient_name=name, 
                                     quantity=quantity, 
                                     threshold=threshold)

    db.session.add(inventory_ingredient)
    db.session.commit()
    
    return inventory_ingredient.to_dict()