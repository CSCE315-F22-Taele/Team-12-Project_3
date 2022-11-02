from . import db
from uuid import uuid4

# A table, that when run using db.create_all() will create this table
class Menu(db.Model):
    item_id = db.Column(db.String(36), primary_key=True)
    item_name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.String(1000))
    price = db.Column(db.Float, nullable=False, default=0)

    ingredients = db.relationship("Ingredient", cascade="all, delete-orphan")

    def __init__(self, **kwargs):
        self.ingredient_id = str(uuid4())
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        self.to_dict()

    def __repr__(self):
        return f"Menu Item: {self.item_name} {self.price}$"