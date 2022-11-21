from marshmallow import Schema, fields, validate, validates_schema, ValidationError

# To take check for restock-report parameter
class RestockSchema(Schema):
    amount = fields.Int(required=True, validate=validate.Range(min=0, error="Amount added must be >= 0"))

# To take check for restock-report parameter
class ReportSchema(Schema):
    restock_report = fields.Boolean(
        attribute="restock-report", 
        default=False,
        description="If specified will return inventory ingredients where quantity < threshold. Specify with query parameter ?restock-report"
    )

# To marshal output of patch and put, marshal NEEDS a schema
class CountResponseSchema(Schema):
    countUpdated = fields.Int()

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
    ingredient_id = fields.Str(data_type="ingredientId")
    ingredient_name = fields.Str(data_type="ingredientName")
    quantity = fields.Int()
    threshold = fields.Int()

class InventoryResponseSchema(Schema):
    # Acts as a parent class for ingredients
    # Allows the list of ingredients to be mapped to "inventory" key
    ingredients = fields.Nested(IngredientResponseSchema(many=True))

