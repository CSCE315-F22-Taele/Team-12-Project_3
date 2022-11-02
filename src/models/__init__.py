from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user_typedb import UserType
from .credentialsdb import Credentials
from .userdb import User # Depends on Credentials

from .inventorydb import Inventory
from .menu_inventorydb import MenuInventory
from .menudb import Menu
# from .itemdb import Item