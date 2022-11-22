from marshmallow import Schema, fields
from .userschema import *
from .inventoryschema import *
from .menuschema import *


class ErrorSchema(Schema):
    error = fields.Str()