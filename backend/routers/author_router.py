from fastapi import APIRouter, HTTPException
from models.author import Author
from services.author_service import create_author, get_author, list_authors
from services.author_service import update_author
from services.author_service import delete_author

router = APIRouter()

@router.post("/", response_model=Author)
def create_author_endpoint(author: Author):
    return create_author(author)

@router.get("/{author_id}", response_model=Author)
def get_author_endpoint(author_id: str):
    author = get_author(author_id)
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    return author

@router.get("/", response_model=list[Author])
def list_authors_endpoint():
    return list_authors()

@router.put("/{author_id}", response_model=Author)
def update_author_endpoint(author_id: str, updated_author: Author):
    author = update_author(author_id, updated_author)
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    return author

@router.delete("/{author_id}")
def delete_author_endpoint(author_id: str):
    success = delete_author(author_id)
    if not success:
        raise HTTPException(status_code=404, detail="Author not found")
    return {"message": "Author deleted"}
