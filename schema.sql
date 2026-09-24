-- schema.sql

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_nome TEXT NOT NULL,
    user_senha TEXT NOT NULL
    user_tipo TEXT NOT NULL -- e.g. 'ADM', 'TEMPORARIO', 'EMPRESTIMO'
    user_modulos TEXT NOT NULL -- armazena array JSON, e.g. ['colecao','perfil']
);

CREATE TABLE IF NOT EXISTS itens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_nome TEXT NOT NULL,
    item_autoria TEXT NOT NULL
    item_tipo TEXT NOT NULL -- e.g., 'LIVRO', 'QUADRO'
);

CREATE TABLE IF NOT EXISTS itens_livro (
    id INTEGER PRIMARY KEY,
    author TEXT NOT NULL,
    page_count INTEGER,
    FOREIGN KEY (id) REFERENCES itens(id) ON DELETE CASCADE
);