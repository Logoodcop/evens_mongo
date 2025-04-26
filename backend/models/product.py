from pydantic import BaseModel, Field
from typing import Optional


class Product(BaseModel):
    id: Optional[str] = Field(alias="_id")
    name: str
    description: Optional[str] = None
    price: float
    category: str
    stock_quantity: int

    class Config:
        validate_by_name = True