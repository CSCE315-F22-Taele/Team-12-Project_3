from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user_typedb import UserType
from .credentialsdb import Credentials

from .ingredientdb import Ingredient
from .itemdb import Item
from .inventorydb import Inventory
from .orderdb import Order
from .userdb import User # This depends on Credentials & Order