from flask import Flask
from .config import Config
from .extensions import db, migrate, jwt  # Ajout de l'importation de 'jwt'
from .models import User, Property
from .routes.user_routes import user_routes  # Assurez-vous que le chemin est correct

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialisation des extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)  # Initialisation de JWT

    # Enregistrement des blueprints
    app.register_blueprint(user_routes)  # Assurez-vous que 'user_routes' est bien défini

    return app
