from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class Phone(BaseModel):
    id: Optional[str] = Field(alias="_id")
    brand: str = Field(..., min_length=2, max_length=50)
    model: str = Field(..., min_length=1)
    price: float = Field(..., gt=0)
    stock: int = Field(default=0, ge=0)
    specs: dict = Field(default_factory=dict)  # Especificaciones técnicas

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "brand": "Samsung",
                "model": "Galaxy S23",
                "price": 899.99,
                "stock": 50,
                "specs": {"RAM": "8GB", "Storage": "256GB"}
            }
        }