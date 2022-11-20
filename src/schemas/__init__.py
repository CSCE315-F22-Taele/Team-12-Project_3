from marshmallow import Schema, fields
from .userschema import *
from .inventoryschema import *


class ErrorSchema(Schema):
    error = fields.Str()