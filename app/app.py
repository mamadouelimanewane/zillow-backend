from flask import Flask
from app.extensions import db
from app.routes.user_routes import user_routes

def create_app():
    app = Flask(__name__)

    # Charger les configurations
    app.config.from_object('config.Config')

    # Initialiser l'extension de la base de données
    db.init_app(app)

    # Enregistrer les blueprints
    app.register_blueprint(user_routes, url_prefix='/users')

    return app

app = create_app()
