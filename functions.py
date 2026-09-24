from db import get_db

tabelaItensVazia = True

def exibirAcervo():
    if tabelaItensVazia:
       return # Nenhuma colecao!
    else:
        # buscar no banco

        def check_table_status(table_name):
            with get_db() as conn:
                cursor = conn.execute(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name=?",
                    (table_name,)
                )
                table_exists = cursor.fetchone() is not None

                if not table_exists:
                    return {"exists": False, "has_items": False}

                # 2. Check if the table has at least one item
                cursor = conn.execute(f"SELECT COUNT(*) FROM {table_name}")
                row_count = cursor.fetchone()[0]
                has_items = row_count > 0

                return {"exists": True, "has_items": has_items}

            status = check_table_status("items")

            if status["exists"]:
                print("Table exists!")
                if status["has_items"]:
                    print("Table has items.")
                else:
                    print("Table is empty.")
            else:
                print("Table does not exist yet.")