from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_apispec.extension import FlaskApiSpec
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
import os

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

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
        Menu, MenuInventory, Inventory,
        Order, OrderMenu
    )
    from .routes import (
        user, 
        inventory,
        menu,
        order
    )

    app.config.update({
        'APISPEC_SPEC': APISpec(
            title='315 POS',
            version='v1',
            plugins=[MarshmallowPlugin()],
            openapi_version='2.0.0'
        ),
        'APISPEC_SWAGGER_URL': '/swagger/',  # URI to access API Doc JSON 
        'APISPEC_SWAGGER_UI_URL': '/swagger-ui/'  # URI to access UI of API Doc
    })

    baseBP = Blueprint('root', __name__, url_prefix='/api')
    baseBP.register_blueprint(user.bp)
    baseBP.register_blueprint(inventory.bp)
    baseBP.register_blueprint(menu.bp)
    baseBP.register_blueprint(order.bp)
    app.register_blueprint(baseBP)

    docs = FlaskApiSpec(app)
    docs.register(user.UserResource, blueprint='user')
    # docs.register(inventory.InventoryResource, blueprint='inventory')
    # docs.register(inventory.IngredientResource, blueprint='inventory')

    db.app = app
    db.init_app(app)

    @app.get("/")
    def index():
        return "Hello World"

    return app

app = create_app()
