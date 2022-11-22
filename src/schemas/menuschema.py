from marshmallow import Schema, fields, validate, validates_schema, ValidationError

# To take check for restock-report parameter
class DescriptionSchema(Schema):
    descriptions = fields.Boolean(
        attribute='description',
        default=False,
        description="If specified will return items in menu with descriptions included. Specify with query parameter ?descriptions"
    )

# To marshal output of patch and put, marshal NEEDS a schema
# class CountResponseSchema(Schema):
#     countUpdated = fields.Int()

# class IngredientRequestSchema(Schema):
#     ingredientName = fields.Str(required=True) # deserialize this key -> ingredient_name
#     amount = fields.Int(validate=validate.Range(min=0, error="Amount added must be >= 0")) # referring to how much to add to quantity
#     newThreshold = fields.Int(validate=validate.Range(min=1, error="New threshold must be > 0"))

#     @validates_schema
#     def validate_amount_or_threshold(self, data, **kwargs):
#         # Checks if either amount and/or newThreshold passed in.
#         # If neither passed in, validation error
#         if not (('amount' in data) or ('newThreshold' in data)):
#             raise ValidationError(
#                 "Must provide either valid 'amount' and / or 'newThreshold'!",
#                 data['ingredientName'] # Use this name to display error
#             )

# class ItemRequestSchema(Schema):
#     ingredients = fields.Nested(IngredientRequestSchema(many=True), required=True)

class ItemResponseSchema(Schema):
    itemId = fields.Str()
    itemName = fields.Str()
    description = fields.Str()
    price = fields.Float()

class MenuResponseSchema(Schema):
    # Acts as a parent class for ingredients
    # Allows the list of ingredients to be mapped to "inventory" key
    items = fields.Nested(ItemResponseSchema(many=True))

