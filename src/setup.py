from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
import os

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
}
]

