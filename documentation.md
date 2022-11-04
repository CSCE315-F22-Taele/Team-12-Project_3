# Orders

### GET /orders
Get all the orders(not recommended at all)

**Response**
```json
{

}
```

<br>

### GET /orders?not-served
Get all the orders that haven't been served

**Response**
```json
{

}
```

<br>

### GET /orders/items/excess-report
Get all the items for orders after a given timestamp where the item sold less than 10% of their current inventory

**Request**
```json
{
    "startDate": "YEAR-MONTH-DAY" // 2021-10-5
}
```

**Response**
```json
{

}
```

<br>

### GET /orders/items/sales-report
Get sales by item from order history given startDate & endDate

**Request**
```json
{
    "startDate": "YEAR-MONTH-DAY", // 2021-10-5
    "endDate": "YEAR-MONTH-DAY", // 2021-10-10
}
```

**Response**
```json
{

}
```

<br>

### POST /orders/order
Create an order with its linked items and add it to the database

**Request**
```json
{
    "customerName": "Tony Jellygum",
    "items": [
        {
            "itemName": "Test Item1",
            "quantity": 3
        },
        {
            "itemName": "Test Item2",
            "quantity": 2
        },
    ]
}
```

**Response**
```json
{

}
```

<br>

### PUT /orders/order/serve
Set the order as served in the database

**Request**
```json
{
    "orderId": "7da7-j1od-61nf-ag02"
}
```

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

### GET /inventory?restock-report
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