from marshmallow import Schema, fields, validate

class VerifyUserRequestSchema(Schema):
    username = fields.Str(required=True, data_key="username")
    password = fields.Str(required=True)

# Methods using this schema must have json body follow 
class UserRequestSchema(Schema):
    userName = fields.Str(required=True, error_messages={"required": "missing data for userName"})
    password = fields.Str(required=True, error_messages={"required": "missing data for password"})
    email = fields.Email(required=True)
    userType = fields.Int(
        missing=0, 
        validate=validate.Range(min=0, max=1, error="userType must be 0(server) or 1(manager)"), 
    )

class UserResponseSchema(Schema):
    # datakey makes it so that response uses that instead of variable name
    # variables named because 1-1 mapping to db model
    id = fields.Str()
    username = fields.Str(data_key="userName")
    user_type = fields.Int(data_key="userType")
    email = fields.Email()