from flask import Blueprint, request, jsonify
from app.models import User
from app.extensions import db
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

user_routes = Blueprint('user_routes', __name__)

# Route pour l'enregistrement d'un utilisateur
@user_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"msg": "Missing required fields"}), 400

    # Vérifie si l'utilisateur existe déjà
    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username already exists"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already exists"}), 400

    # Hash le mot de passe
    hashed_password = generate_password_hash(password, method='sha256')

    # Crée l'utilisateur
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

# Route pour la connexion (login)
@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Missing required fields"}), 400

    # Cherche l'utilisateur
    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid credentials"}), 401

    # Crée un token JWT pour l'utilisateur
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

# Route protégée pour créer une propriété
@user_routes.route('/create-property', methods=['POST'])
@jwt_required()
def create_property():
    # Logique pour créer une propriété
    return jsonify({"msg": "Property created!"}), 201
