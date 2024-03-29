import os
from datetime import timedelta

from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_apispec.extension import FlaskApiSpec
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin

# Authorization Imports
from flask_jwt_extended import (
    create_access_token, get_jwt, get_jwt_identity,
    jwt_required, JWTManager, set_access_cookies,
    unset_jwt_cookies
)

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY = os.environ.get("SECRET_KEY"),
            SQLALCHEMY_DATABASE_URI="postgresql://csce315_912_cherian:830002546@csce-315-db.engr.tamu.edu/csce315_912_12"
        )
    else:
        app.config.from_mapping(test_config)

    # For Swagger Documentation
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

    # Authorization Configs
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    # app.config["JWT_ALGORITHM"] = "RS256"
    # app.config["JWT_DECODE_ALGORITHMS"] = "RS256"
    # app.config["JWT_PUBLIC_KEY"] = "RS256"
    app.config["JWT_SECRET_KEY"] = os.environ.get("ENCRYPTION_SECRET_KEY")

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

    jwt = JWTManager(app)

    baseBP = Blueprint('root', __name__, url_prefix='/api')
    baseBP.register_blueprint(user.bp)
    baseBP.register_blueprint(inventory.bp)
    baseBP.register_blueprint(menu.bp)
    baseBP.register_blueprint(order.bp)
    app.register_blueprint(baseBP)

    docs = FlaskApiSpec(app)
    docs.register(user.UserResource, blueprint='user')
    docs.register(user.EmailResource, blueprint='user')
    docs.register(user.VerifyUserResource, blueprint='user')
    docs.register(inventory.RestockReportResource, blueprint='inventory')
    docs.register(inventory.InventoryResource, blueprint='inventory')
    docs.register(inventory.IngredientResource, blueprint='inventory')
    docs.register(menu.MenuResource, blueprint='menu')
    docs.register(menu.MenuTypesResource, blueprint='menu')
    docs.register(menu.ItemResource, blueprint='menu')
    docs.register(order.SalesReportResource, blueprint='orders')
    docs.register(order.ExcessReportResource, blueprint='orders')
    docs.register(order.OrderResource, blueprint='orders')

    db.app = app
    db.init_app(app)

    @app.get("/")
    def index():
        return "Hello World"

    return app

app = create_app()
