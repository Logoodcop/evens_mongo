from pydantic import BaseModel, Field
from typing import Optional

class Book(BaseModel):
    id: Optional[str] = Field(alias="_id")
    title: str
    author: str
    isbn: str
    genre: Optional[str] = None
    price: float
    stock: int

    class Config:
        validate_by_name = True
        schema_extra = {
            "example": {
                "title": "Cien años de soledad",
                "author": "Gabriel García Márquez",
                "isbn": "978-0307474728",
                "genre": "Novela",
                "price": 25.99,
                "stock": 10
            }
        }