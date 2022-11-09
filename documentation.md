# Orders

### GET /orders?serverId=2f7f-fslg-glob-ba7o
Get all the orders(not recommended at all). Optionally, pass in a serverId to get orders related to that server.
**Ensure that the request type is json, and simply pass in an empty {}.**

**Response**
```json
{
    "orders": [
        {
            "orderId": "97sf-fayg-9s6f-a1no",
            "customerName": "Chimmy Cherian",
            "serverId": "2f7f-fslg-glob-ba7o",
            "timeOrdered": "...",
            "isServed": true, // or false
            "price": 24.22,
            "items": [
                {
                    "itemName": "Test Item1",
                    "quantity": 3,
                    "totalPrice": 36.21
                },
                ...
            ]
        }
    ]
}
```

<br>

### GET /orders?not-served&serverId=2f7f-fslg-glob-ba7o
Get all the orders that haven't been served. Optionally, pass in a serverId to get orders related to that server.

**Response**
```json
{
    "orders": [
        {
            "orderId": "97sf-fayg-9s6f-a1no",
            "customerName": "Chimmy Cherian",
            "serverId": "2f7f-fslg-glob-ba7o",
            "timeOrdered": "...",
            "isServed": false,
            "price": 24.22,
            "items": [
                {
                    "itemName": "Test Item1",
                    "quantity": 3,
                    "totalPrice": 36.21
                },
                ...
            ]
        }
    ]
}
```

<br>

### GET /orders/items/excess-report?startDate=YYYY-MM-DD
Get all the items for orders after a given timestamp where the item sold less than 10% of their current inventory

**Response**
```json
{
    "items": [
        {
            "itemName": "Test Item1",
            "sales": 26,
            "currentStock": 2752
        },
        ...
    ]
}
```

<br>

### GET /orders/items/sales-report?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
Get sales by item from order history given startDate & endDate

**Response**
```json
{
    "items": [
        {
            "itemName": "Test Item",
            "sales": 28,
            "revenue": 725.26
        },
        ...
    ]
}
```

<br>

### POST /orders/order
Create an order with its linked items and add it to the database. Optionally pass in serverId to manually assign.

**Request**
```json
{
    "customerName": "Tony Jellygum",
    "serverId": "a601-iaft-aiyg-oaf2", // OPTIONAL
    "items": [
        {
            "itemName": "Test Item1",
            "quantity": 3
        },
        ...
    ]
}
```

**Response**
```json
{
    "orderId": "7a9a-h10a-its0-ajof",
    "customerName": "Perry Chow",
    "serverId": "a601-iaft-aiyg-oaf2",
    "timeOrdered": "",
    "isServed": false,
    "price": 47.21,
    "items": [
        {
            "itemName": "Test Item1",
            "quantity": 3,
            "totalPrice": 36.21
        },
        ...
    ]
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
    "ingredientsUsed": [
        {
            "ingredientName": "Test Ingredient",
            "amountRemoved": 5
        },
        ...
    ]
}
```


# Menu

### GET /menu
Get all menu items

**Response**
```json
{
    "items": [
        {
            "itemId": "97sf-fayg-9s6f-a1no",
            "itemName": "Test Item",
            "price": 10.22
        },
        ...
    ]
}
```

<br>

### GET /menu?descriptions
Get all menu items with descriptions

**Response**
```json
{
    "items": [
        {
            "itemId": "97sf-fayg-9s6f-a1no",
            "itemName": "Test Item",
            "description": "This is a test item",
            "price": 10.22
        },
        ...
    ]
}
```

<br>

### GET /menu/item?itemName=Test Item
Get a specific menu item

**Response**
```json
{
    "itemId": "97sf-fayg-9s6f-a1no",
    "itemName": "Test Item",
    "description": "This is a test item",
    "price": 10.27
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
        "Ingredient Name2",
        "New Ingredient Name1"
    ]
}
```

**Response**
```json
{
    "itemCreated": 1,
    "ingredientsLinked": 3,
    "newIngredientsCreated": 1
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
    "success": true
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
    "success": true
}
```


# Inventory

### GET /inventory
Retrieves all the ingredients in the inventory

**Response**
```json
{
    "ingredients": [
        {
            "ingredientId": "97sf-fayg-9s6f-a1no",
            "ingredientName": "Test Ingredient",
            "quantity": 710,
            "threshold": 100
        },
        ...
    ]
}
```

<br>

### GET /inventory?restock-report
Get all ingredients that have a lower quantity than their respective threshold

**Response**
```json
{
    "ingredients": [
        {
            "ingredientId": "97sf-fayg-9s6f-a1no",
            "ingredientName": "Test Ingredient",
            "quantity": 99,
            "threshold": 100
        },
        ...
    ]
}
```

<br>

### GET /inventory/ingredient?ingredientName=Test Ingredient
Get a specific ingredient from inventory

**Response**
```json
{
    "ingredientId": "97sf-fayg-9s6f-a1no",
    "ingredientName": "Test Ingredient",
    "quantity": 99,
    "threshold": 100
}
```

<br>

### PUT /inventory/restock
Restock specified ingredients in the inventory by their respective amounts

**Request**
```json
{
    "ingredients": [
        {
            "ingredientName": "Test Ingredient1",
            "amount": 20
        },
        ...
    ]
}
```

**Response**
```json
{
    "countRestocked": 2
}
```

<br>

### PUT /inventory/restock?all
Restock all the ingredients in the inventory adding a static amount to each quantity

**Request**
```json
{
    "amount": 250
}
```

**Response**
```json
{
    "countRestocked": 18
}
```

<br>

### PUT /inventory/threshold
Change the threshold of all ingredients in the specified list

**Request**
```json
{
    "ingredients": [
        {
            "ingredientName": "Test Ingredient",
            "newThreshold": 120
        },
        ...
    ]
}
```

**Response**
```json
{
    "countChanged": 2
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
    "success": true
}
```
