from . import db, Credentials
from uuid import uuid4

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(36), primary_key=True)
    username = db.Column(db.String(50), unique=True)
    user_type = db.Column(db.Integer, db.ForeignKey("user_types.id"), nullable=False, default=0)

    # Relationship between User & Credentials, so that you can add to both in one transaction
    user_credential = db.relationship("Credentials")

    def __init__(self, **kwargs):
        self.id = str(uuid4())
        super().__init__(**kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_json(self):
        self.to_dict()