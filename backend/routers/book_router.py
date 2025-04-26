from fastapi import APIRouter, HTTPException
from models.book import Book
from services.book_service import (
    create_book,
    get_book,
    list_books,
    update_book,
    delete_book
)

router = APIRouter(
    prefix="/books",
    tags=["books"],
    responses={404: {"description": "Book not found"}},
)

@router.post("/", response_model=Book)
async def create_book_endpoint(book: Book):
    return await create_book(book)

@router.get("/{book_id}", response_model=Book)
async def get_book_endpoint(book_id: str):
    book = await get_book(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.get("/", response_model=list[Book])
async def list_books_endpoint():
    return await list_books()

@router.put("/{book_id}", response_model=Book)
async def update_book_endpoint(book_id: str, book: Book):
    updated_book = await update_book(book_id, book)
    if not updated_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return updated_book

@router.delete("/{book_id}")
async def delete_book_endpoint(book_id: str):
    if not await delete_book(book_id):
        raise HTTPException(status_code=404, detail="Book not found")
    return {"message": "Book deleted successfully"}