import sqlite3
from flask import g

DB_NAME = "database.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    with open("schema.sql", "r", encoding="utf-8") as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_NAME)
        # usar nome das coisas ao inves de index. ex: row["user_nome"]
        g.db.row_factory = sqlite3.Row
        # para o delete de itens_livro funcionar, ja que eh foreign (ON DELETE CASCADE no schema)
        g.db.execute("PRAGMA foreign_keys = ON")
    return g.db

def close_db(e=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()