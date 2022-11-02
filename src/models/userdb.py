from . import db, Credentials, Order
from uuid import uuid4

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(36), primary_key=True)
    username = db.Column(db.String(50), unique=True)
    user_type = db.Column(db.Integer, db.ForeignKey("user_types.id"), nullable=False, default=0)

    credentials = db.relationship("Credentials", cascade="all, delete-orphan")
    orders = db.relationship("Order", cascade="all, delete-orphan")

    def __init__(self, **kwargs):
        self.id = str(uuid4())
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        self.to_dict()

    # def __repr__(self):
    #     return f"Inventory Item: {self.ingredient_name} {self.quantity} {self.threshold}"