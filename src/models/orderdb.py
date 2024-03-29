from . import db, Menu, OrderMenu
from sqlalchemy.ext.associationproxy import association_proxy
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

    # TODO: look at back-populates or backref???
    orderMenuLinking = db.relationship(
        "OrderMenu",
        uselist=True
    )
    menuItems = association_proxy("orderMenuLinking", "menuItem")

    # NOTE: We eagerly load the mappings with items, but not with ingredients yet
    #       because we would only want to access ingredients in the PUT request.
    #       Loading above is "eager", and in PUT request it is on "query"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self):
        # FIXME: THIS IS SO BAD AND UGLY
        itemsInfo = []
        for menuLinkingObj, itmObj in zip(self.orderMenuLinking, self.menuItems):
            menuLinkingObjDict = menuLinkingObj.to_dict()
            dictToAdd = itmObj.to_dict()
            dictToAdd['quantity'] = menuLinkingObjDict['quantity']
            dictToAdd['totalPrice'] = menuLinkingObjDict['total_price']
            itemsInfo.append(dictToAdd)

        return {
            "orderId": self.id,
            "customerName": self.customer_name,
            "serverId": self.server_id,
            "timeOrdered": self.time_ordered,
            "isServed": self.is_served,
            "price": self.price,
            "items": itemsInfo
        }

    def to_json(self):
        return self.to_dict()
