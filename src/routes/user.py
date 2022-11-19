from flask import Blueprint, abort, make_response
from flask_restful import Resource, Api
from flask_apispec import use_kwargs, marshal_with, MethodResource, doc
from marshmallow import fields, Schema, validate
from webargs.flaskparser import parser
from ..models import db, User, Credentials, UserType

bp = Blueprint('user', __name__)
api = Api(bp)

# Methods using this schema must have json body follow 
class UserRequestSchema(Schema):
    userName = fields.Str(required=True, error_messages={"required": "missing data for userName"})
    password = fields.Str(required=True, error_messages={"required": "missing data for password"})
    userType = fields.Int(
        missing=0, 
        validate=validate.Range(min=0, max=1, error="userType must be 0(server) or 1(manager)"), 
    )

class UserResponseSchema(Schema):
    # class Meta:
    #     fields = ("id", "username", "user_type")
    id = fields.Str()
    userName = fields.Str()
    userType = fields.Int()

class UserResource(Resource, MethodResource):
    @marshal_with(UserResponseSchema, code=200, description="Entity Successfully Retrieved")
    @marshal_with(None, code=404, description="Entity Not Found")
    @doc(description="Get an existing user from the database", tags=["User"])
    def get(self, username):
        user = User.query.filter_by(username=username).first() # Should return just one or None
        if user is None:
            return abort(404, description="Username not found!")
        return user.to_dict()

    @marshal_with(UserResponseSchema(), code=204, description="Entity Successfully Deleted")
    @marshal_with(None, code=404, description="Entity Not Found")
    @doc(description="Delete an existing user from the database", tags=["User"])
    def delete(self, username):
        user = User.query.filter_by(username=username).first()
        if user is None:
            return abort(404, description="Username not found!")
        ret = user.to_dict()
        User.query.filter_by(username=username).delete()
        db.session.commit()
        return ret

class CreateUserResource(Resource, MethodResource):
    @use_kwargs(UserRequestSchema) # request body must follow this format
    @marshal_with(UserResponseSchema, code=201, description="Entity Successfully Created")
    @marshal_with(None, code=422, description="Request Parsing Failure")
    @doc(description="Create a new user in the database with associated credentials", tags=["User"])
    def post(self, userName, password, userType):
        user = User(username=userName, 
                    user_type=userType,)

        credentials = Credentials(id=user.id,
                                password=password)

        # Add a user & their associated credentials
        user.user_credential.append(credentials)
        db.session.add(user)
        db.session.commit()
        return user.to_dict()

    @parser.error_handler
    def handle_request_parsing_error(err, req, schema, error_status_code, error_headers):
        error_message = {"msg": "The request was unable to be followed due to missing data."}
        error_message['errors'] = err.messages.get('json')
        abort(make_response(error_message, 422))

api.add_resource(UserResource, '/user/<string:username>')
api.add_resource(CreateUserResource, '/user')