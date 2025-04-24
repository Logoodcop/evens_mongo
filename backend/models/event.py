from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, List
from datetime import datetime
from enum import Enum

class EventStatus(str, Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    CANCELED = "canceled"
    COMPLETED = "completed"

class Event(BaseModel):
    # ... (tus campos actuales)
    status: EventStatus = Field(default=EventStatus.DRAFT)
    image_url: Optional[HttpUrl] = None
    ticket_price: Optional[float] = Field(None, ge=0)
    max_attendees: Optional[int] = Field(None, gt=0)
    tags: List[str] = Field(default_factory=list)