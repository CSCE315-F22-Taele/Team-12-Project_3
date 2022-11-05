from . import db, OrderMenu, Menu
from uuid import uuid4
import datetime

class Order(db.Model):

    # Primary Keys will be tuple, but they must be in proper order
    __tablename__ = "orders"
    id = db.Column(db.String(36), primary_key=True)
    customer_name = db.Column(db.String(255), nullable=False)
    server_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    time_ordered = db.Column(db.DateTime(timezone=False), nullable=False, server_default="datetime.datetime.utcnow")
    is_served = db.Column(db.Boolean, nullable=False, server_default="False")
    price = db.Column(db.Float, nullable=False, server_default="0")

    orderMenuItems = db.relationship(
                        "Menu", 
                        secondary=OrderMenu,
                        uselist=True
                    )

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self):
        return {
            "orderId": self.id,
            "customerName": self.customer_name,
            "serverId": self.server_id,
            "timeOrdered": self.time_ordered,
            "isServed": self.is_served,
            "price": self.price,
            "items": self.orderMenuItems # FIXME: This might be horribly wrong
        }

    def to_json(self):
        return self.to_dict()
