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
Get all inventory items under threshold

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

### PUT /inventory

### PUT /inventory

### PUT /inventory


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
**response**
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
    "itemName": "Test Item"
    "newPrice": 17.82
}
```

**Response**
```json
{

}
```

### DELETE /menu/<string: itemName>
Delete the specified item from the database

**Response**
```json
{

}
```
