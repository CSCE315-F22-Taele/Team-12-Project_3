from marshmallow import Schema, fields, validate, validates, validates_schema, ValidationError

# To take check for restock-report parameter
class DescriptionSchema(Schema):
    descriptions = fields.Boolean(
        attribute='description',
        default=False,
        description="If specified will return items in menu with descriptions included. Specify with query parameter ?descriptions"
    )

class ItemRequestSchema(Schema):
    '''
    itemName: str
    description: str
    price: float
    linkedInventory: list(str)
    '''
    itemName = fields.Str(required=True)
    description = fields.Str(required=True)
    price = fields.Float(required=True, validate=validate.Range(min=0, error="Amount added must be >= 0")) # referring to how much to add to quantity
    linkedInventory = fields.List(fields.Str, required=True)

    @validates(linkedInventory)
    def validate_inventory(self, inventory):
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

class MenuResponseSchema(Schema):
    # Acts as a parent class for ingredients
    # Allows the list of ingredients to be mapped to "inventory" key
    items = fields.Nested(ItemResponseSchema(many=True))

class PostResponseSchema(Schema):
    itemCreated = fields.Str()
    ingredientsLinked = fields.Int()
    newIngredientsCreated = fields.List(fields.Str)