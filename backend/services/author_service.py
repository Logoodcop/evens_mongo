from models.author import Author

# Simulación de base de datos en memoria
authors_db = {}

def create_author(author: Author) -> Author:
    authors_db[author.id] = author
    return author

def get_author(author_id: str) -> Author | None:
    return authors_db.get(author_id)

def list_authors() -> list[Author]:
    return list(authors_db.values())

def update_author(author_id: str, updated_author: Author) -> Author | None:
    if author_id in authors_db:
        authors_db[author_id] = updated_author
        return updated_author
    return None

def delete_author(author_id: str) -> bool:
    if author_id in authors_db:
        del authors_db[author_id]
        return True
    return False
