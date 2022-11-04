from . import db, Inventory
from uuid import uuid4

class MenuInventory(db.Model):

    # Primary Keys will be tuple, but they must be in proper order
    __tablename__ = "menu_inventory"
    item_id = db.Column(db.String(36), db.ForeignKey('menu.item_id', onupdate="CASCADE", ondelete="CASCADE"), primary_key=True)
    ingredient_id = db.Column(db.String(36), db.ForeignKey('inventory.ingredient_id', onupdate="CASCADE"), primary_key=True)

    # uselist required so that inventoryIngredients always considered a list; avoids Nonetype
    inventoryIngredients = db.relationship("Inventory", uselist=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        return self.to_dict()

    def __repr__(self):
        return f"{self.itemId} {self.ingredientId}"