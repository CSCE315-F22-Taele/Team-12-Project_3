# import os, atexit
# from flask import Flask, redirect, url_for, render_template, request, session, flash
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy.dialects import postgresql
# from uuid import uuid4

# app = Flask(__name__)
# app.secret_key = "DEVELOPMENT"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:searchbar@localhost/baby-tracker'

# db = SQLAlchemy(app)

# # @app.route("/<name>")
# # def home(name):
# #     return render_template("index.html", content=name)

# @app.route("/")
# def home():
#     return render_template("index.html")

# @app.route("/login", methods=["GET", "POST"])
# def login():
#     if request.method == "POST":
#         user = request.form["nm"]
#         session["user"] = user
#         return redirect(url_for("user"))
#     else:
#         if "user" in session:
#             return redirect(url_for("user"))
#         return render_template("login.html")

# @app.route("/user", methods=["POST", "GET"])
# def user():
#     email = None
#     if "user" in session: # Session data deleted from server when web browser closes
#         user = session["user"]
#         if request.method == "POST":
#             email = request.form["email"]
#             session["email"] = email
#         else:
#             if "email" in session:
#                 email = session['email']

#         # return f"<h1>{user}</h1>"
#         return render_template("user.html", user=user, email=email)
#     else:
#         return redirect(url_for("login"))

# @app.route("/logout")
# def logout():
#     if "user" in session:
#         flash("You have been logged out!", "info")
#     session.pop("user", None) # Msg related to removing a session
#     session.pop("email", None) # Msg related to removing a session
#     return redirect(url_for("login"))

# # Get entire inventory
# # Optionally, get one if endpoint is ?name=""
# @app.route("/inventory")
# def get_inventory():
#     name = request.args.get('name')
#     if name is not None:
#         name = name.replace("+", " ")
#         inventory_ingredients = Inventory.query.filter_by(ingredient_name=name).all() # Should just be one
#     else:
#         inventory_ingredients = Inventory.query.order_by(Inventory.ingredient_name.asc()).all()
#     return {"inventory": [inv.getFormatted() for inv in inventory_ingredients]}

# # # Get ingredient from inventory, from endpoint /inventory?name=""
# # @app.route("/inventory")
# # def get_inventory_ingredient_name():
# #     name = request.args.get('name')
# #     inventory_ingredient = Inventory.query.filter_by(ingredient_name=name).first() # Returns None if no results
# #     if inventory_ingredient is not None:
# #         return {"inventory": [inventory_ingredient.getFormatted()]}
# #     return {"inventory": [None]}
    

# # Add ingredient to inventory
# @app.route("/inventory", methods=["POST"])
# def create_inventory_ingredient():
#     name = request.json["name"]
#     quantity = request.json["quantity"]
#     threshold = request.json["threshold"]
#     inventory_ingredient = Inventory(name, quantity, threshold)

#     db.session.add(inventory_ingredient)
#     db.session.commit()
    
#     return inventory_ingredient.getFormatted()

# if __name__ == "__main__":
#     app.run(debug=True)

