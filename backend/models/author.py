from pydantic import BaseModel
from typing import Optional

class Author(BaseModel):
    id: str
    name: str
    bio: Optional[str] = None
