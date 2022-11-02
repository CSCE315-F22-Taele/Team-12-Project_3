from . import db
from uuid import uuid4

class OrderMenu(db.Model):

    # Primary Keys will be tuple, but they must be in proper order
    __tablename__ = "order_menu"
    orderId = db.Column("order_id", db.String(36), db.ForeignKey("orders.id"), primary_key=True)
    itemId = db.Column("item_id", db.String(36), db.ForeignKey('menu.item_id'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=0)
    totalPrice = db.Column("total_price", db.Integer, nullable=False, default=0)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        self.to_dict()
