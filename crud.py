from db import get_db

CAMPOS = ["item_nome", "item_autoria", "item_editora", "item_genero", "item_isbn"]

def criar(dados):
    db = get_db()
    cursor = db.execute(
        f"INSERT INTO itens ({', '.join(CAMPOS)}) "
        f"VALUES ({', '.join('?' for _ in CAMPOS)})",
        [dados.get(c, "") for c in CAMPOS]
    )
    db.commit()
    return cursor.lastrowid

def atualizar(item_id, dados):
    db = get_db()
    sets = ", ".join(f"{c} = ?" for c in CAMPOS)
    db.execute(
        f"UPDATE itens SET {sets} WHERE id = ?",
        [dados.get(c, "") for c in CAMPOS] + [item_id]
    )
    db.commit()