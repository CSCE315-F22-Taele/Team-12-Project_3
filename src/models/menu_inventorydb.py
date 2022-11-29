from . import db

MenuInventory = db.Table(
    "menu_inventory",
    db.Column("item_id", db.Integer, db.ForeignKey('menu.item_id', onupdate="CASCADE", ondelete="CASCADE"), primary_key=True),
    db.Column("ingredient_id", db.Integer, db.ForeignKey('inventory.ingredient_id', onupdate="CASCADE", ondelete="CASCADE"), primary_key=True),
    extend_existing=True # Use the table itself in the database
)