# entry point da aplicação
import sqlite3
from flask import Flask, jsonify, render_template, request
from db import init_db, get_db, close_db

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

if __name__ == '__main__':
    app.run(debug=True)