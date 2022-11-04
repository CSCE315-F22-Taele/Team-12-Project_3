from . import db, Ingredient, Item
from uuid import uuid4
import datetime

class Order(db.Model):

    # Primary Keys will be tuple, but they must be in proper order
    __tablename__ = "orders"
    id = db.Column(db.String(36), primary_key=True)
    customer_name = db.Column(db.String(255), nullable=False)
    server_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    time_ordered = db.Column(db.DateTime(timezone=False), nullable=False, default=datetime.datetime.utcnow)
    is_served = db.Column(db.Boolean, nullable=False, default=False)
    price = db.Column(db.Float, nullable=False, default=0)

    ingredients = db.relationship("Ingredient", cascade="all, delete-orphan")
    items = db.relationship("Item", cascade="all, delete-orphan")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        return self.to_dict()
