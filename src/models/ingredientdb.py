from . import db
from uuid import uuid4

class Ingredient(db.Model):

    # Primary Keys will be tuple, but they must be in proper order
    __tablename__ = "ingredients"
    ingredient_id = db.Column(db.String(36), db.ForeignKey('inventory.ingredient_id'), primary_key=True)
    ingredient_name = db.Column(db.String(255), nullable=False)
    item_id = db.Column(db.String(36), db.ForeignKey('menu.item_id'), primary_key=True)
    order_id = db.Column(db.String(36), db.ForeignKey("orders.id"), primary_key=True)
    amount = db.Column(db.Integer, nullable=False, default=0)
    threshold = 100

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        self.to_dict()

    def __repr__(self):
        return f"Inventory Item: {self.ingredient_name} {self.quantity} {self.threshold}"