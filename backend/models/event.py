from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from enum import Enum

class EventCategory(str, Enum):
    TECH = "technology"
    BUSINESS = "business"
    SOCIAL = "social"
    EDUCATION = "education"

class Event(BaseModel):
    id: Optional[str] = Field(
        default=None,
        alias="_id",
        description="ID único generado automáticamente por MongoDB"
    )
    name: str = Field(
        ...,
        min_length=3,
        max_length=100,
        example="Conferencia de Python",
        description="Nombre completo del evento"
    )
    description: Optional[str] = Field(
        default=None,
        max_length=500,
        example="Evento anual de la comunidad Python"
    )
    start_time: datetime = Field(
        ...,
        example="2023-11-15T09:00:00",
        description="Fecha y hora de inicio en formato ISO 8601"
    )
    end_time: datetime = Field(
        ...,
        description="Fecha y hora de finalización en formato ISO 8601"
    )
    location: str = Field(
        ...,
        example="Centro de Convenciones Principal",
        description="Ubicación física del evento"
    )
    categories: List[EventCategory] = Field(
        default_factory=list,
        example=[EventCategory.TECH],
        description="Categorías de clasificación"
    )
    is_published: bool = Field(
        default=False,
        description="Indica si el evento está publicado públicamente"
    )

    @validator("end_time")
    def validate_end_time(cls, v, values):
        if "start_time" in values and v <= values["start_time"]:
            raise ValueError("La hora de fin debe ser posterior a la de inicio")
        return v

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Meetup de Desarrollo Web",
                "description": "Evento mensual para desarrolladores",
                "start_time": "2023-11-20T18:00:00",
                "end_time": "2023-11-20T21:00:00",
                "location": "Coworking Central",
                "categories": ["technology", "education"],
                "is_published": True
            }
        }