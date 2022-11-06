from . import db, Menu, OrderMenu
import datetime

# time_ordered = db.Column(db.DateTime(timezone=False), nullable=False)

class Order(db.Model):

    # Primary Keys will be tuple, but they must be in proper order
    __tablename__ = "orders"
    id = db.Column(db.String(36), primary_key=True)
    customer_name = db.Column(db.String(255), nullable=False)
    server_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    time_ordered = db.Column(db.DateTime(timezone=False), nullable=False)
    is_served = db.Column(db.Boolean, nullable=False, server_default="False")
    price = db.Column(db.Float, nullable=False, server_default="0")

    menuItems = db.relationship(
                "Menu", 
                secondary="order_menu",
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
            "items": [itm.to_dict() for itm in self.menuItems]
        }

    def to_json(self):
        return self.to_dict()
