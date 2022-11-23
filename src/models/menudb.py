from . import db, MenuInventory, Inventory

# A table, that when run using db.create_all() will create this table
class Menu(db.Model):
    itemId = db.Column("item_id", db.String(36), primary_key=True)
    itemName = db.Column("item_name", db.String(255), nullable=False, unique=True)
    description = db.Column(db.String(1000))
    price = db.Column(db.Float, nullable=False, server_default="0")

    # uselist required so that menuIngredients always considered a list; avoids Nonetype
    menuIngredients = db.relationship(
                        "Inventory", 
                        secondary=MenuInventory,
                        uselist=True
                    )

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self, includeDescripts=False):
        ret = {
            "itemId": self.itemId,
            "itemName": self.itemName,
            "price": self.price
        }
        if includeDescripts: ret["description"] = self.description
        return ret
            

    def to_json(self):
        return self.to_dict()

    def __repr__(self):
        return f"Menu Item: {self.itemName} {self.price}$ {self.description}"