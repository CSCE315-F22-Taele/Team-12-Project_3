from marshmallow import Schema, fields, validate, validates, validates_schema, ValidationError
from datetime import date

class SalesRequestSchema(Schema):
    startDate = fields.Date(required=True, format='%Y-%m-%d')
    endDate = fields.Date(required=True, format='%Y-%m-%d')

    @validates_schema
    def validate_end_greater_start(self, data, **kwargs):
        # Check to see if the end date is farther than start date
        if data['endDate'] < data['startDate']:
            raise ValidationError(
                "Must provide either an endDate later than startDate!",
                "Date Error"
            )

class SalesResponseSchemaChild(Schema):
    itemName = fields.Str()
    sales = fields.Int()
    revenue = fields.Float()

class SalesResponseSchema(Schema):
    items = fields.Nested(SalesResponseSchemaChild(many=True))

class ExcessRequestSchema(Schema):
    startDate = fields.Date(required=True, format='%Y-%m-%d')

    @validates('startDate')
    def validate_start_date(self, date, **kwargs):
        # Check to see if the end date is farther than start date
        if date > date.today():
            raise ValidationError(
                "Must provide startDate earlier than today!",
            )

class ExcessResponseSchemaChild(Schema):
    itemId = fields.Str()
    itemName = fields.Str()
    sales = fields.Int()

class ExcessResponseSchema(Schema):
    items = fields.Nested(ExcessResponseSchemaChild(many=True))

class OrderGetRequestSchema(Schema):
    not_served = fields.Boolean(
        attribute='not-served',
        default=False,
        description="Pass in not-served to get orders that haven't been served yet. Pass as ?not-served"
    )
    serverId = fields.Str(
        description="Pass in serverId to get orders assigned to some server. Pass as ?serverId=..."
    )

class IngredientRequestSchema(Schema):
    ingredientName = fields.Str(required=True) # deserialize this key -> ingredient_name
    amount = fields.Int(validate=validate.Range(min=0, error="Amount added must be >= 0")) # referring to how much to add to quantity
    newThreshold = fields.Int(validate=validate.Range(min=1, error="New threshold must be > 0"))

    @validates_schema
    def validate_amount_or_threshold(self, data, **kwargs):
        # Checks if either amount and/or newThreshold passed in.
        # If neither passed in, validation error
        if not (('amount' in data) or ('newThreshold' in data)):
            raise ValidationError(
                "Must provide either valid 'amount' and / or 'newThreshold'!",
                data['ingredientName'] # Use this name to display error
            )

class InventoryRequestSchema(Schema):
    # Acts as a parent class for ingredients
    # Allows the list of ingredients to be mapped to "inventory" key
    ingredients = fields.Nested(IngredientRequestSchema(many=True), required=True)

class IngredientResponseSchema(Schema):
    ingredientId = fields.Str()
    ingredientName = fields.Str()
    quantity = fields.Int()
    threshold = fields.Int()

class InventoryResponseSchema(Schema):
    # Acts as a parent class for ingredients
    # Allows the list of ingredients to be mapped to "inventory" key
    ingredients = fields.Nested(IngredientResponseSchema(many=True))

