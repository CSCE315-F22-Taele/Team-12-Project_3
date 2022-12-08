from marshmallow import Schema, fields, validate, validates, validates_schema, ValidationError

menuTypes = set(["Entrees", "Sides", "Drinks", "Misc", "Desserts"])

# To take check for restock-report parameter
class DescriptionSchema(Schema):
    description = fields.Bool(
        attribute='descriptions',
        default=False,
        description="If specified will return items in menu with descriptions included. Specify with query parameter ?description"
    )

class ItemRequestSchema(Schema):
    itemName = fields.Str(required=True)
    description = fields.Str(required=True)
    price = fields.Float(required=True, validate=validate.Range(min=0, error="Price must be >= 0"))
    linkedInventory = fields.List(fields.Str, required=True)
    menuType = fields.Str(validate=validate.OneOf(choices=menuTypes))
    # linkedInventory = fields.Str(required=True, many=True)

    @validates('linkedInventory')
    def validate_inventory(self, inventory, **kwargs):
        if len(inventory) == 0:
            raise ValidationError('List must be non-empty!')
        elif len(set(inventory)) != len(inventory):
            raise ValidationError('List must not contain dupliates!')

class NewPriceRequestSchema(Schema):
    itemName = fields.Str(required=True)
    newPrice = fields.Float(required=True, validate=validate.Range(min=0, error="New Price must be >= 0"))

class ItemResponseSchema(Schema):
    itemId = fields.Str()
    itemName = fields.Str()
    description = fields.Str()
    price = fields.Float()
    menuType = fields.Str()

class MenuResponseSchema(Schema):
    # Acts as a parent class for ingredients
    # Allows the list of ingredients to be mapped to "inventory" key
    items = fields.Nested(ItemResponseSchema(many=True))

class MenuTypesResponseSchema(Schema):
    types = fields.List(fields.Str)

class PostResponseSchema(Schema):
    itemCreated = fields.Str()
    ingredientsLinked = fields.Int()
    newIngredientsCreated = fields.List(fields.Str)