from flask import Flask
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
        db, Inventory, UserType, Credentials, User
    )
    from .routes import inventory # TODO: import routes

    app.register_blueprint(inventory.bp)

    db.app = app
    db.init_app(app)

    @app.get("/")
    def index():
        return "Hello World"

    return app

app = create_app()
