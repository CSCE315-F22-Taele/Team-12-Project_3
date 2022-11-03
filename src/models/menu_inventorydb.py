from . import db, Inventory
from uuid import uuid4

class MenuInventory(db.Model):

    # Primary Keys will be tuple, but they must be in proper order
    __tablename__ = "menu_inventory"
    itemId = db.Column("item_id", db.String(36), db.ForeignKey('menu.item_id', onupdate="CASCADE", ondelete="CASCADE"), primary_key=True)
    ingredientId = db.Column("ingredient_id", db.String(36), db.ForeignKey('inventory.ingredient_id', onupdate="CASCADE"), primary_key=True)

    inventoryIngredients = db.relationship("Inventory")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        self.to_dict()