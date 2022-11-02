from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user_typedb import UserType
from .credentialsdb import Credentials
from .userdb import User # This depends on Credentials

from .ingredientdb import Ingredient
from .inventorydb import Inventory