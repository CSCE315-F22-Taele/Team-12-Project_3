# The models for the database

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user_typedb import UserType
from .credentialsdb import Credentials
from .userdb import User # Depends on Credentials

from .inventorydb import Inventory
from .menu_inventorydb import MenuInventory
from .menudb import Menu

from .order_menudb import OrderMenu
from .orderdb import Order