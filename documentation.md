# Menu

### GET /menu
Get all menu items

**Response**
```json
{
    
}
```

<br>

### GET /menu/item
Get a specific menu item

**Request**
```json
{
    "itemName": "Test Item"
}
```

**Response**
```json
{
    
}
```

<br>

### POST /menu/item
Create a new menu item AND also create associated ingredients if new

**Request**
```json
{
    "itemName": "New Item",
    "description": "This is a new item",
    "price": 42.21,
    "linkedInventory": [
        "Ingredient Name1",
        "Ingredient Name2"
    ]
}
```

**Response**
```json
{

}
```

<br>

### PUT /menu/item/price
Update a menu item's price

**Request**
```json
{
    "itemName": "Test Item",
    "newPrice": 17.82
}
```

**Response**
```json
{

}
```

### DELETE /menu/item
Delete the specified item from the database

**Request**
```json
{
    "itemName": "Test Item"
}
```

**Response**
```json
{

}
```


# Inventory

### GET /inventory
Retrieves all the ingredients in the inventory

**Response**
```json
{

}
```

<br>

### GET /inventory?under-stocked
Get all ingredients that have a lower quantity than their respective threshold

**Response**
```json
{

}
```

<br>

### GET /inventory/ingredient
Get a specific ingredient from inventory

**Request**
```json
{
    "ingredientName": "Test Ingredient"
}
```

**Response**
```json
{

}
```

<br>

### PUT /inventory/ingredient/restock
Restock a specific ingredient from inventory, adding the amount to the current quantity

**Request**
```json
{
    "ingredientName": "Test Ingredient",
    "amount": 20
}
```

**Response**
```json
{

}
```

<br>

### PUT /inventory/restock?all
Restock all the ingredients in the inventory, adding the amount to each quantity

**Response**
```json
```

<br>

### PUT /inventory/ingredient/threshold
Change the threshold of a particular ingredient in the inventory

**Request**
```json
{
    "ingredientName": "Test Ingredient",
    "newThreshold": 120
}
```

**Response**
```json
{

}
```

<br>

### DELETE /inventory/ingredient
Delete a specific ingredient from inventory

**Request**
```json
{
    "ingredientName": "Test Ingredient"
}
```
    
**Response**
```json
{

}
```