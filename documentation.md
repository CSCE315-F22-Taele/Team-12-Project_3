# Inventory

### GET

/inventory
- Get all inventory items
- response: {

}

/inventory?under-stocked
- Get all inventory items under threshold
- response: {

}

/inventory/<string: ingredientName>
- Get a specific ingredient from inventory
- response: {

}

### PUT

/inventory

/inventory

/inventory

### DELETE

/inventory/<string: ingredientName>
- Delete a specific ingredient from inventory
- response: {

}

# Menu

### GET

/menu
- Get all menu items
- response: {
    
}

/menu/<string: itemName>
- Get a specific menu item
- response: {
    
}

### POST

/menu
- Create a new menu item AND also create associated ingredients if new
- request: {

}
- response: {

}

### PUT

/menu
- Update a menu item's price
- request: {
    itemName: string
    newPrice: double
}
- response: {

}

### DELETE

/menu/<string: itemName>
- Delete the specified item from the database
- response: {

}