from flask import Blueprint, abort, make_response, jsonify
from flask_apispec import use_kwargs, marshal_with, MethodResource, doc
from webargs.flaskparser import parser
from flask_restful import Api
from flask_jwt_extended import jwt_required
from ..models import db, User, Credentials
from ..schemas import (
    VerifyUserRequestSchema,
    UserRequestSchema, UserResponseSchema, 
    SuccessSchema, ErrorSchema
)

bp = Blueprint('user', __name__)
api = Api(bp) # Honestly unsure why this is needed to work

@doc(tags=["User"])
class VerifyUserResource(MethodResource):
    @use_kwargs(VerifyUserRequestSchema)
    @marshal_with(UserResponseSchema, code=200, description="Login Successful")
    @marshal_with(ErrorSchema, code=401, description="Login Unsuccessful")
    @doc(description="Authenticate User Login")
    def post(self, username, password):
        try:
            fullCredentials = db.session.query(
                                User.username,
                                Credentials.password
                            ).\
                                select_from(User).\
                                outerjoin(Credentials, User.id == Credentials.id).\
                                all()
            user = fullCredentials.query.filter_by(username=username, password=password).first()
            if user is None:
                return make_response(jsonify(error="Wrong Username and/or Password!"), 401)
            else:
                return User.query.filter_by(username=username).first()
        except:
            return make_response(jsonify(error="An error occurred, maybe with client"), 401)

@doc(tags=["User"])
class UserResource(MethodResource):
    @marshal_with(UserResponseSchema, code=200, description="Entity Successfully Retrieved")
    @marshal_with(ErrorSchema, code=404, description="Entity Not Found")
    @doc(description="Get an existing user from the database")
    @jwt_required
    def get(self, username):
        user = User.query.filter_by(username=username).first() # Should return just one or None
        if user is None:
            return make_response(jsonify(error="Username Not Found!"), 404)
        return user

    @marshal_with(SuccessSchema, code=202, description="Entity Successfully Deleted")
    @marshal_with(ErrorSchema, code=404, description="Entity Not Found")
    @doc(description="Delete an existing user from the database")
    def delete(self, username):
        user = User.query.filter_by(username=username).first()
        if user is None:
             return make_response(jsonify(error="Username Not Found!"), 404)
        User.query.filter_by(username=username).delete()
        db.session.commit()
        return {"success": True}, 202

    @use_kwargs(UserRequestSchema) # request body must follow this format
    @marshal_with(UserResponseSchema, code=201, description="Entity Successfully Created")
    @marshal_with(ErrorSchema, code=422, description="Request Parsing Failure")
    @marshal_with(ErrorSchema, code=400, description="Duplicate Username")
    @doc(description="Create a new user in the database with associated credentials")
    def post(self, userName, password, userType, email):
        userQuery = User.query.filter_by(username=userName).exists()
        userExists = db.session.query(userQuery).scalar() # returns t/f
        if userExists:
            return make_response(jsonify(error="Duplicate Username in Database!"), 400)

        user = User(username=userName, 
                    user_type=userType,
                    email=email)
        credentials = Credentials(id=user.id,
                                password=password)

        # Add a user & their associated credentials
        user.user_credential.append(credentials)
        db.session.add(user)
        db.session.commit()
        return user, 201 # Must specify the status code even though marshal_with

    @parser.error_handler
    def handle_request_parsing_error(err, req, schema, error_status_code, error_headers):
        abort(make_response(jsonify(error=err.messages.get('json')), 422))

user_view = UserResource.as_view("userresource")
verify_user_view = VerifyUserResource.as_view("verifyuserresource")
bp.add_url_rule('/user/<string:username>', view_func=user_view, methods=['GET', 'DELETE'])
bp.add_url_rule('/user', view_func=user_view, methods=['POST'])
bp.add_url_rule('/login', view_func=verify_user_view, methods=['POST'])