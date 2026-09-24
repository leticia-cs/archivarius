# entry point da aplicação
import sqlite3
from flask import Flask, jsonify, render_template, request
from db import get_db, init_db

app = Flask(__name__)
#iniciar banco
# init_db()

# API - CRUD
# TODO: Revisar

# Ler tudo
@app.route("/api/items", methods=["GET"])
def get_items():
    pass
    # db = get_db()
    # items = db.execute("SELECT * FROM items").fetchall()
    # return jsonify([dict(item) for item in items])


# CREATE: Add a new item
@app.route("/api/items", methods=["POST"])
def add_item():
    pass

# DELETE: Remove an item
@app.route("/api/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    pass

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/')
def home():
    #return jsonify({"message": "API is running!"})
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)