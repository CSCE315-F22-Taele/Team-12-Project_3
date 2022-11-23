from marshmallow import Schema, fields
from .userschema import *
from .inventoryschema import *
from .menuschema import *

class SuccessSchema(Schema):
    success = fields.Boolean(default=True)

class ErrorSchema(Schema):
    error = fields.Str()