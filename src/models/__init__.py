from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .ingredientdb import Ingredient
from .inventorydb import Inventory