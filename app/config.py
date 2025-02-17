import os

class Config:
    # Clé secrète pour Flask
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    
    # Configuration pour la base de données
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///instance/app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Configuration pour JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_jwt_secret_key_here")
