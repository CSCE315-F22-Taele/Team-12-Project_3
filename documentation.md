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

### GET /inventory/{ingredientName}
Get a specific ingredient from inventory

**Request**

|variable|type|
|-|-|
| ingredientName | string |

**Response**
```json
{

}
```

<br>

### PUT /inventory/restock/
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

### PUT /inventory/threshold/
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
```

<br>

### DELETE /inventory/{ingredientName}
Delete a specific ingredient from inventory

**Request**
|variable|type|
|-|-|
| ingredientName | string |
    
**Response**
```json
{

}
```

# Menu

### GET /menu
Get all menu items

**Response**
```json
{
    
}
```

<br>

### GET /menu/{itemName}
Get a specific menu item

**Request**
|variable|type|
|-|-|
| itemName | string |

**Response**
```json
{
    
}
```

<br>

### POST /menu
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

### PUT /menu
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

### DELETE /menu/{itemName}
Delete the specified item from the database

**Request**
|variable|type|
|-|-|
| itemName | string |

**Response**
```json
{

}
```
