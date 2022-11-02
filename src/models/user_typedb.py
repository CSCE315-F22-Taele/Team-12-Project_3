from . import db

class UserType(db.Model):

    # Primary Keys will be tuple, but they must be in proper order
    __tablename__ = "user_types"
    id = db.Column(db.Integer, primary_key=True)
    user_type = db.Column("type", db.String(30), nullable=False, unique=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        self.to_dict()

    # def __repr__(self):
    #     return f"Inventory Item: {self.ingredient_name} {self.quantity} {self.threshold}"