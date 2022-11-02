from . import db, Ingredient
from uuid import uuid4

# A table, that when run using db.create_all() will create this table
class Inventory(db.Model):
    ingredient_id = db.Column(db.String(36), primary_key=True)
    ingredient_name = db.Column(db.String(255), nullable=False, unique=True)
    quantity = db.Column(db.Integer, nullable=False, default=0)
    threshold = db.Column(db.Integer, default=100)

    ingredients = db.relationship("Ingredient", cascade="all, delete-orphan")

    def __init__(self, **kwargs):
        self.ingredient_id = str(uuid4())
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
        # return {
        #     "name": self.ingredient_name,
        #     "quantity": self.quantity,
        #     "threshold": self.threshold
        # }

    def to_json(self):
        self.to_dict()

    def __repr__(self):
        return f"Inventory Item: {self.ingredient_name} {self.quantity} {self.threshold}"