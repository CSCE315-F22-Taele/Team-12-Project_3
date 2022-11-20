from marshmallow import Schema, fields, validate

class RestockSchema(Schema):
    restock_report = fields.Boolean(
        attribute="restock-report", 
        default=False,
        description="If specified will return inventory ingredients where quantity < threshold. Specify with query parameter ?restock-report"
    )

class IngredientResponseSchema(Schema):
    ingredient_id = fields.Str(data_type="ingredientId")
    ingredient_name = fields.Str(data_type="ingredientId")
    quantity = fields.Int()
    threshold = fields.Int()  

class InventorySchema(Schema):
    # Acts as a parent class for ingredients
    # Allows the list of ingredients to be mapped to "inventory" key
    ingredients = fields.Nested(IngredientResponseSchema(many=True))