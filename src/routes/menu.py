from flask import request, Blueprint
from ..models import db, Menu, MenuInventory, Inventory
from uuid import uuid4

bp = Blueprint('menu', __name__, url_prefix='/menu')

@bp.get('/')
def getAllMenuItems():
    menuItems = Menu.query.order_by(Menu.item_name.asc()).all()
    return {"menu_items": [itm.to_dict() for itm in menuItems]}

# Put has same behavior always, assumes you pass in a complete entity & that it replaces existing entity in db
@bp.put('/')
def updateMenuPrice():
    itemName = request.json["item_name"]
    newPrice = request.json["new_price"]

    menuItem = Menu.query.filter_by(item_name=itemName).first()
    if menuItem is None:
        return None, # TODO: Error Code
    menuItem.price = newPrice
    db.session.commit()
    return "Update Successful"


'''
{
    itemName: str,
    description: str,
    price: float,
    linkedInventory: list(str)
}
'''
@bp.post('/')
def addMenuItem():
    itemName = request.json['item_name']
    description = request.json['description']
    price = request.json['price']
    linkedInventory = request.json['linked_inventory'] # list of strings

    inventory = Inventory.query.all() # NOTE: EXTREMELY INEFFICIENT, CHANGE LATER
    inventoryMapping = {inv.ingredient_name: inv for inv in inventory}

    # In the loop...
    #   If new ingredient
    #       We insert ingredient into "Inventory" database
    #   Else
    #       We get ingredient instance's UUID
    #   We append Inventory.ingredientId to MenuInventory.inventoryIngredients
    #   We append MenuInventory.ingredientId to Menu.menuIngredients
    # When done, add item to "Menu" database
    menuItem = Menu(
        item_id=str(uuid4()),
        item_name=itemName, 
        description=description, 
        price=price
    )
    for ingredientName in linkedInventory:
        if ingredientName not in inventoryMapping:
            ingredient = Inventory(
                    ingredient_id=str(uuid4()),
                    ingredient_name=ingredientName,
                    quantity=0,
                    threshold=100
                )
            db.session.add(ingredient) # Doesn't actually run the query yet, more like "stages" them for the commit
            inventoryMapping[ingredientName] = ingredient
        inv = inventoryMapping.get(ingredientName)
        menuInventory = MenuInventory(item_id=menuItem.item_id, ingredient_id=inv.ingredient_id)
        menuInventory.inventoryIngredients.append(inv)
        menuItem.menuIngredients.append(menuInventory)

    db.session.add(menuItem)
    db.session.commit()

    return "Item Creation Successful", 200


@bp.delete("/")
def delMenuItem():
    itemName = request.json['item_name']
    rowsDeleted = Menu.query.filter_by(item_name=itemName).delete()
    db.session.commit()
    return {"deleted": rowsDeleted}