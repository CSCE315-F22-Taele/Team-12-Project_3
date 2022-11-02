from . import db
from uuid import uuid4

class Credentials(db.Model):
    id = db.Column(db.String(36), db.ForeignKey('users.id'), primary_key=True)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, **kwargs):
        self.id = str(uuid4())
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        self.to_dict()

    # def __repr__(self):
    #     return f"Inventory Item: {self.ingredient_name} {self.quantity} {self.threshold}"