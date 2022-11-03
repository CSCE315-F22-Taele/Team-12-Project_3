from . import db
from uuid import uuid4

# A table, that when run using db.create_all() will create this table
class Inventory(db.Model):
    ingredient_id = db.Column(db.String(36), primary_key=True)
    ingredient_name = db.Column(db.String(255), nullable=False, unique=True)
    quantity = db.Column(db.Integer, nullable=False, default=0)
    threshold = db.Column(db.Integer, default=100)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        self.to_dict()

    def __repr__(self):
        return f"{self.ingredientId} {self.ingredientName} {self.quantity} {self.threshold}"