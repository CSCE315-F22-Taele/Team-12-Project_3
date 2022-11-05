from . import db

# A table, that when run using db.create_all() will create this table
class Inventory(db.Model):
    ingredient_id = db.Column(db.String(36), primary_key=True)
    ingredient_name = db.Column(db.String(255), nullable=False, unique=True)
    quantity = db.Column(db.Integer, nullable=False, server_default="0")
    threshold = db.Column(db.Integer, server_default="100")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self):
        return {
            "ingredientId": self.ingredient_id,
            "ingredientName": self.ingredient_name,
            "quantity": self.quantity,
            "threshold": self.threshold
        }

    def to_json(self):
        return self.to_dict()

    def __repr__(self):
        return f"{self.ingredientId} {self.ingredientName} {self.quantity} {self.threshold}"