from flask import Blueprint, abort, make_response, jsonify
from flask_apispec import use_kwargs, marshal_with, MethodResource, doc
from webargs.flaskparser import parser
from flask_restful import Api
from ..models import db, User, Credentials
from ..schemas import UserRequestSchema, UserResponseSchema, ErrorSchema

bp = Blueprint('user', __name__)
api = Api(bp) # Honestly unsure why this is needed to work

@doc(tags=["User"])
class UserResource(MethodResource):
    @marshal_with(UserResponseSchema, code=200, description="Entity Successfully Retrieved")
    @marshal_with(ErrorSchema, code=404, description="Entity Not Found")
    @doc(description="Get an existing user from the database")
    def get(self, username):
        user = User.query.filter_by(username=username).first() # Should return just one or None
        if user is None:
            return make_response(jsonify(error="Username Not Found!"), 404)
        return user.to_dict()

    @marshal_with(UserResponseSchema(), code=204, description="Entity Successfully Deleted")
    @marshal_with(ErrorSchema, code=404, description="Entity Not Found")
    @doc(description="Delete an existing user from the database")
    def delete(self, username):
        user = User.query.filter_by(username=username).first()
        if user is None:
             return make_response(jsonify(error="Username Not Found!"), 404)
        ret = user.to_dict()
        User.query.filter_by(username=username).delete()
        db.session.commit()
        return ret

    @use_kwargs(UserRequestSchema) # request body must follow this format
    @marshal_with(UserResponseSchema, code=201, description="Entity Successfully Created")
    @marshal_with(ErrorSchema, code=422, description="Request Parsing Failure")
    @marshal_with(ErrorSchema, code=400, description="Duplicate Username")
    @doc(description="Create a new user in the database with associated credentials")
    def post(self, userName, password, userType):
        userQuery = User.query.filter_by(username=userName).exists()
        userExists = db.session.query(userQuery).scalar() # returns t/f
        if userExists:
            return make_response(jsonify(error="Duplicate Username in Database!"), 400)

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
        # error_message = {"msg": "The request was unable to be followed due to missing data."}
        # error_message['errors'] = err.messages.get('json')
        return make_response(jsonify(error=err.messages.get('json')), 422)

user_view = UserResource.as_view("userresource")
bp.add_url_rule('/user/<string:username>', view_func=user_view, methods=['GET', 'DELETE'])
bp.add_url_rule('/user', view_func=user_view, methods=['POST'])