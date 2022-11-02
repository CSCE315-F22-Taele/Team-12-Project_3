from . import db
from uuid import uuid4

class Item(db.Model):

    # Primary Keys will be tuple, but they must be in proper order
    __tablename__ = "items"
    id = db.Column(db.String(36), db.ForeignKey('inventory.ingredient_id'), primary_key=True)
    itemName = db.Column("item_name", db.String(255), nullable=False)
    order_id = db.Column(db.String(36), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=0)
    totalPrice = db.Column("total_price", db.Integer, nullable=False, default=0)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        self.to_dict()
