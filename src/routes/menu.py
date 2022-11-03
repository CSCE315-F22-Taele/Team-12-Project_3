from flask import request, Blueprint
from ..models import db, Menu, MenuInventory, Inventory
from uuid import uuid4

bp = Blueprint('menu', __name__, url_prefix='/menu')

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
    inventoryMapping = {inv.ingredientName: inv for inv in inventory}

    # In the loop...
    #   If new ingredient
    #       We insert ingredient into "Inventory" database
    #   Else
    #       We get ingredient instance's UUID
    #   We append Inventory.ingredientId to MenuInventory.inventoryIngredients
    #   We append MenuInventory.ingredientId to Menu.menuIngredients
    # When done, add item to "Menu" database
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
                    quantity=0,
                    threshold=100
                )
            db.session.add(ingredient)
            inventoryMapping[ingredientName] = ingredient
        inv = inventoryMapping.get(ingredientName)
        menuInventory = MenuInventory(itemId=menuItem.itemId, ingredientId=inv.ingredientId)
        menuInventory.inventoryIngredients.append(inv)
        menuItem.menuIngredients.append(menuInventory)

    db.session.add(menuItem)
    db.session.commit()

    return "Item Creation Successful", 200


@bp.delete("/")
def delMenuItem():
    itemName = request.json['item_name']
    rowsDeleted = Menu.query.filter_by(itemName=itemName).delete()
    db.session.commit()
    return {"deleted": rowsDeleted}