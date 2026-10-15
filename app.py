# entry point da aplicação
import sqlite3
from flask import Flask, jsonify, render_template, request
from db import init_db, get_db, close_db
import crud

app = Flask(__name__)
app.teardown_appcontext(close_db)

init_db()

@app.route('/colecao')
def pagina_colecao():
    termo = request.args.get("q", "")
    db = get_db()
    if termo:
        itens = db.execute(
            "SELECT * FROM itens WHERE item_nome LIKE ?", (f"%{termo}%",)
        ).fetchall()
    else:
        itens = db.execute("SELECT * FROM itens").fetchall()
    return render_template("colecao.html", itens=itens, termo=termo)

@app.route('/')
def home():
    #return jsonify({"message": "API is running!"})
    return render_template('home.html')

# === ROTAS API ===========

# CRUD - create
@app.route('/api/itens', methods=['POST'])
def criar():
    d = request.get_json()
    novo_id = crud.criar(d["titulo"], d["autoria"], d["editora"], d["genero"], d["isbn"])
    return jsonify({"id": novo_id}), 201

# CRUD - read
@app.route('/api/itens', methods=['GET'])
def listar_tudo():
    return jsonify([dict(r) for r in crud.listar_tudo()])

# CRUD - update
@app.route('/api/itens/<int:item_id>', methods=['PUT'])
def atualizar(item_id):
    d = request.get_json()
    crud.atualizar(item_id, d["nome"], d["autoria"], d["tipo"])
    return "", 204

# CRUD - delete
@app.route('/api/itens/<int:item_id>', methods=['DELETE'])
def deletar_item(item_id):
    crud.deletar_item(item_id)
    return "", 204

@app.route('/api/itens', methods=['DELETE'])
def deletar_tudo():
    crud.deletar_tudo()
    return "", 204

# extra: buscar
@app.route('/api/itens/<int:item_id>', methods=['GET'])
def buscar(item_id):
    item = crud.buscar(item_id)
    if item is None:
        return jsonify({"erro": "não encontrado"}), 404
    return jsonify(dict(item))

if __name__ == '__main__':
    app.run(debug=True)