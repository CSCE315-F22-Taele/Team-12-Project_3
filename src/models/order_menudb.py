from . import db
from uuid import uuid4

class OrderMenu(db.Model):

    # Primary Keys will be tuple, but they must be in proper order
    __tablename__ = "order_menu"
    order_id = db.Column(db.String(36), db.ForeignKey("orders.id"), primary_key=True)
    item_id = db.Column(db.String(36), db.ForeignKey('menu.item_id'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, server_default="0")
    total_price = db.Column(db.Integer, nullable=False, server_default="0")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        return self.to_dict()
