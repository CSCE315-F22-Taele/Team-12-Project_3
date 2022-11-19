from flask import request, Blueprint
from ..models import db, Menu, MenuInventory, Inventory
from uuid import uuid4

bp = Blueprint('menu', __name__, url_prefix='/menu')

@bp.get('/')
def getAllMenuItems():
    includeDescripts = ('descriptions' in request.args)
    menuItems = Menu.query.order_by(Menu.item_name.asc()).all()
    return {"items": [itm.to_dict(includeDescripts) for itm in menuItems]}

@bp.get('/item')
def getMenuItem():
    itemName = request.args.get('itemName')
    menuItem = Menu.query.filter_by(item_name=itemName).first()
    return menuItem.to_dict(includeDescripts=True)

@bp.post('/item')
def addMenuItem():
    itemName = request.json['itemName']
    description = request.json['description']
    price = request.json['price']
    linkedInventory = request.json['linkedInventory'] # list of strings

    inventory = Inventory.query.all() # NOTE: EXTREMELY INEFFICIENT, CHANGE LATER
    inventoryMapping = {inv.ingredient_name: inv for inv in inventory}

    newCounts = 0
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
                )
            db.session.add(ingredient) # Doesn't actually run the query yet, more like "stages" them for the commit
            newCounts += 1
            inventoryMapping[ingredientName] = ingredient
        inv = inventoryMapping.get(ingredientName)
        MenuInventory.insert().values(item_id=menuItem.item_id, ingredient_id=inv.ingredient_id)
        menuItem.menuIngredients.append(inv)

    db.session.add(menuItem)
    db.session.commit()

    return {
        "itemCreated": 1,
        "ingredientsLinked": len(linkedInventory),
        "newIngredientsCreated": newCounts
    }

# Put has same behavior always, assumes you pass in a complete entity & that it replaces existing entity in db
@bp.put('/item/price')
def updateMenuItemPrice():
    itemName = request.json["itemName"]
    newPrice = request.json["newPrice"]

    menuItem = Menu.query.filter_by(item_name=itemName).first()
    if menuItem is None:
        return None, # TODO: Error Code
    menuItem.price = newPrice
    db.session.commit()
    return {"success": True}

@bp.delete("/")
def delMenuItem():
    itemName = request.json['itemName']
    Menu.query.filter_by(item_name=itemName).delete()
    db.session.commit()
    return {"success": True}