import requests

reqs = [
{
    "itemName": "Classic Hamburger",
    "description": "Can't go wrong with the classic burger",
    "price": 6.49,
    "linkedInventory": [
        "Beef Patty",
        "Buns",
        "Avocado"
    ]
},
{
    "itemName": "Black Bean Hamburger",
    "description": "For the people who care about animals",
    "price": 7.29,
    "linkedInventory": [
        "Black Bean Patty",
        "Buns"
    ]
},
{
    "itemName": "Bacon Burger",
    "description": "MOAR HEART DISEASE",
    "price": 7.89,
    "linkedInventory": [
        "Beef Patty",
        "Buns",
        "Bacon"
    ]
},
{
    "itemName": "Chicken Sandwich",
    "description": "Simple as can be",
    "price": 7.49,
    "linkedInventory": [
        "Chicken Breast",
        "Buns"
    ]
},
{
    "itemName": "Gig Em Patty Melt",
    "description": "Like a burger, but better",
    "price": 7.09,
    "linkedInventory": [
        "Beef Patty",
        "Buns",
        "Gig Em Sauce",
        "Swiss-American Cheese",
        "Onion"
    ]
},
{
    "itemName": "Caesar Salad",
    "description": "Rabbit food lol",
    "price": 8.29,
    "linkedInventory": [
        "Lettuce",
        "Grilled Chicken",
        "Parmesan",
        "Garlic",
        "Butter",
        "Croutons",
        "Caesar Dressing"
    ]
},
{
    "itemName": "Chicken Tenders",
    "description": "what are you, 7?",
    "price": 7.49,
    "linkedInventory": [
        "Chicken Tenders",
        "French Fries"
    ]
},
{
    "itemName": "Tissues",
    "description": "Tissues",
    "price": 0,
    "linkedInventory": [
        "Tissues"
    ]
},
    {
    "itemName": "Cups",
    "description": "Cups",
    "price": 0,
    "linkedInventory": [
        "Cups"
    ]
},
    {
    "itemName": "Plates",
    "description": "Plates",
    "price": 0,
    "linkedInventory": [
        "Plates"
    ]
},
    {
    "itemName": "Knives",
    "description": "Knives",
    "price": 0,
    "linkedInventory": [
        "Knives"
    ]
},
    {
    "itemName": "Forks",
    "description": "Forks",
    "price": 0,
    "linkedInventory": [
        "Forks"
    ]
},
    {
    "itemName": "Spoons",
    "description": "Spoons",
    "price": 0,
    "linkedInventory": [
        "Spoons"
    ]
},
    {
    "itemName": "Gle Em Sauce",
    "description": "Gle Em Sauce",
    "price": 0,
    "linkedInventory": [
        "GleEmSauce"
    ]
},
    {
    "itemName": "Spicy Ranch Sauce",
    "description": "Spicy Ranch Sauce",
    "price": 0,
    "linkedInventory": [
        "Spicy Ranch Sauce"
    ]
},
    {
    "itemName": "Honey Mustard Sauce",
    "description": "Honey Mustard Sauce",
    "price": 0,
    "linkedInventory": [
        "Honey Mustard Sauce"
    ]
},
    {
    "itemName": "BBQ Sauce",
    "description": "BBQ Sauce",
    "price": 0,
    "linkedInventory": [
        "BBQ Sauce"
    ]
},
    {
    "itemName": "Ranch Sauce",
    "description": "Ranch Sauce",
    "price": 0,
    "linkedInventory": [
        "Ranch Sauce"
    ]
},
    {
    "itemName": "Strawberry Ice Cream Cup",
    "description": "Strawberry Ice Cream Cup",
    "price": 3.29,
    "linkedInventory": [
        "Strawberry Ice Cream"
    ]
},
    {
    "itemName": "Chocolate Ice Cream Cup",
    "description": "Chocolate Ice Cream Cup",
    "price": 3.29,
    "linkedInventory": [
        "Chocolate Ice Cream"
    ]
},
    {
    "itemName": "Vanilla Ice Cream Cup",
    "description": "Vanilla Ice Cream Cup",
    "price": 3.29,
    "linkedInventory": [
        "Vanilla Ice Cream"
    ]
},
    {
    "itemName": "Diet Pepsi",
    "description": "Diet Pepsi",
    "price": 2.45,
    "linkedInventory": [
        "Diet Pepsi"
    ]
},
    {
    "itemName": "Pepsi",
    "description": "Pepsi",
    "price": 2.45,
    "linkedInventory": [
        "Pepsi"
    ]
},
    {
    "itemName": "Cookie Sandwich",
    "description": "Hershey's vanilla ice cream packed between 2 chocolate chip cookies",
    "price": 4.69,
    "linkedInventory": [
        "Chocolate Chip Cookie",
        "Vanilla Ice Cream"
    ]
},
    {
    "itemName": "French Fries",
    "description": "French Fries",
    "price": 2.69,
    "linkedInventory": [
        "French Fries"
    ]
},
    {
    "itemName": "Strawberry Aggie Shake",
    "description": "Strawberry Aggie Shake",
    "price": 4.49,
    "linkedInventory": [
        "Strawberry Ice Cream"
    ]
},
    {
    "itemName": "Chocoloate Aggie Shake",
    "description": "Chocoloate Aggie Shake",
    "price": 4.49,
    "linkedInventory": [
        "Chocoloate Ice Cream"
    ]
},
    {
    "itemName": "Vanilla Aggie Shake",
    "description": "Vanilla Aggie Shake",
    "price": 4.49,
    "linkedInventory": [
        "Vanilla Ice Cream"
    ]
}]

for req in reqs:
    response = requests.post("http://127.0.0.1:5000/api/menu/item", json=req)
    print(response.text)