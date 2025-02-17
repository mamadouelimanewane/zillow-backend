import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///zillow.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///instance/app.db'
    SECRET_KEY = 'your_secret_key_here'  # Assure-toi de changer ce secret pour un vrai secret unique
    JWT_SECRET_KEY = 'your_jwt_secret_key_here'  # Remplace par un secret pour JWT
