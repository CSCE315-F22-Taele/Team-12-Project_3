from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
import os

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY = os.environ.get("SECRET_KEY"),
            SQLALCHEMY_DATABASE_URI=os.environ.get("SQLALCHEMY_DB_URI"),
        )
    else:
        app.config.from_mapping(test_config)

    # IMPORTS NEED TO BE HERE INSTEAD OF AT THE TOP
    from .models import (
        db, 
        UserType, Credentials, User,
        Menu, MenuInventory, Inventory
    )
    from .routes import (
        user, 
        inventory,
        menu
    )

    baseBP = Blueprint('root', __name__, url_prefix='/api')

    
    baseBP.register_blueprint(user.bp)
    baseBP.register_blueprint(inventory.bp)
    baseBP.register_blueprint(menu.bp)

    app.register_blueprint(baseBP)

    db.app = app
    db.init_app(app)

    @app.get("/")
    def index():
        return "Hello World"

    return app

app = create_app()
