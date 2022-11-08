Backend_endpoint = /

# Orders

## GET

/orders

- Get all the orders
- response: {}

/orders/not-served

- Get all the orders that have not been served
- repsonse: {}

## POST

/orders

- Create a new order
- request: {
    name,
    items: [
        {
            itemName: str
            quantity: int
        },
        ...
    ]
}
- response: {
    successMessage: str
}

## PUT

/orders


# Authorization

## POST

/auth

- Post user credentials to do auth
- request: {
    username: str,
    password: str
}
- response: {
    successMessage: str
}

/orders

/orders

/orders

/orders

/orders
