from typing import List, Optional
from bson import ObjectId
from models.book import Book
import db

async def create_book(book: Book) -> Book:
    book_dict = book.dict(by_alias=True, exclude={"id"})
    result = await db.db["books"].insert_one(book_dict)
    book.id = str(result.inserted_id)
    return book

async def get_book(book_id: str) -> Optional[Book]:
    if not ObjectId.is_valid(book_id):
        return None
    book = await db.db["books"].find_one({"_id": ObjectId(book_id)})
    return Book(**book) if book else None

async def list_books() -> List[Book]:
    return [Book(**doc) async for doc in db.db["books"].find()]

async def update_book(book_id: str, book: Book) -> Optional[Book]:
    updated_book = await db.db["books"].find_one_and_update(
        {"_id": ObjectId(book_id)},
        {"$set": book.dict(by_alias=True, exclude={"id"})},
        return_document=True
    )
    return Book(**updated_book) if updated_book else None

async def delete_book(book_id: str) -> bool:
    result = await db.db["books"].delete_one({"_id": ObjectId(book_id)})
    return result.deleted_count > 0