from db import *

def criar_item(nome, autoria, tipo):
    db = get_db()
    cursor = db.execute(
        "INSERT INTO itens (item_nome, item_autoria, item_tipo) VALUES (?, ?, ?)", # interrogacao para evitar inject
        (nome, autoria, tipo)
    )
    db.commit()
    return cursor.lastrowid  # id do item criado; gerado pelo AUTOINCREMENT

def listar_itens():
    db = get_db()
    itens = db.execute("SELECT * FROM itens").fetchall()
    return itens  # lista de sqlite3.Row; como se fosse key do localStorage

def buscar_item(item_id):
    db = get_db()
    item = db.execute(
        "SELECT * FROM itens WHERE id = ?", (item_id,)
    ).fetchone()
    return item  # sqlite3.Row ou None se não existir

# SE QUISER RETORNAR JSON
#item_dict = dict(item)  # funciona graças ao row_factory = sqlite3.Row

def atualizar_item(item_id, nome, autoria, tipo):
    db = get_db()
    db.execute(
        "UPDATE itens SET item_nome = ?, item_autoria = ?, item_tipo = ? WHERE id = ?",
        (nome, autoria, tipo, item_id)
    )
    db.commit()

def deletar_item(item_id):
    db = get_db()
    db.execute("DELETE FROM itens WHERE id = ?", (item_id,))
    db.commit()