import sqlite3

DB_NAME = "database.db"

def get_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:
        with open("schema.sql", "r") as f:
            sql_script = f.read()

        conn.executescript(sql_script)