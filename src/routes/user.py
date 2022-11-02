from flask import Blueprint, request
from ..models import db, User, Credentials, UserType

bp = Blueprint('user', __name__, url_prefix='/user')

# Get entire inventory
# Optionally, get one if endpoint is ?name=""
@bp.get("/")
def getUser():
    name = request.args.get('username')
    if name is not None:
        name = name.replace("+", " ")
        users = User.query.filter_by(username=name).all() # Should return just one
    else:
        users = User.query.order_by(User.username.asc()).all()
    return {"users": [usr.to_dict() for usr in users]}    

# Add User to database
@bp.post("/")
def addUser():
    username = request.json["username"]
    userType = request.json["user_type"]
    password = request.json["password"]

    userTypeInt = 0 if userType == "SERVER" else 1
    user = User(username=username, 
                user_type=userTypeInt,)

    credentials = Credentials(id=user.id,
                              password=password)

    # Add a user & their associated credentials
    user.user_credential.append(credentials)
    db.session.add(user)
    db.session.commit()
    
    return user.to_dict()

# Delete a User & their associated credential from database
@bp.delete("/")
def delUser():
    username = request.json["username"]
    rowsDeleted = User.query.filter_by(username=username).delete()
    db.session.commit()
    return {"deleted": rowsDeleted}