from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from bson import ObjectId

class User(BaseModel):
    id: Optional[str] = Field(alias="_id")
    username: str
    email: EmailStr
    password: str  # En producción, usaría hashing (bcrypt)
    is_active: bool = True
    role: str = "user"  # Ej: "admin", "user"

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}