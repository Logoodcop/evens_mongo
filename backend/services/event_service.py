from typing import List, Optional
from bson import ObjectId
from models.event import Event
import db  


def create_event(event: Event) -> Event:
    """Inserta un evento en MongoDB y retorna el modelo con ID asignado."""
    data = event.dict(by_alias=True, exclude={"id"})  
    result = db.db["events"].insert_one(data)       
    event.id = str(result.inserted_id)                 
    return event


def get_event(event_id: str) -> Optional[Event]:
    """Busca un evento por ObjectId y retorna el modelo o None."""
    doc = db.db["events"].find_one({"_id": ObjectId(event_id)})
    if doc:
        doc["id"] = str(doc["_id"])                  
        del doc["_id"]                               
        return Event(**doc)                             
    return None


def list_events() -> List[Event]:
    """Devuelve lista de todos los eventos como modelos Pydantic."""
    events: List[Event] = []
    for doc in db.db["events"].find():
        doc["id"] = str(doc["_id"])                   
        del doc["_id"]                                 
        events.append(Event(**doc))                    
    return events

def update_event(event_id: str, updated_event: Event) -> Optional[Event]:
    """Actualiza un evento por su ID y retorna el evento actualizado o None si no existe."""
    data = updated_event.dict(by_alias=True, exclude={"id"})
    result = db.db["events"].find_one_and_update(
        {"_id": ObjectId(event_id)},
        {"$set": data},
        return_document=True
    )
    if result:
        result["id"] = str(result["_id"])
        del result["_id"]
        return Event(**result)
    return None


# services/event_service.py
def delete_event(event_id: str) -> bool:
    try:
        # Asegúrate que el ID sea válido
        if not ObjectId.is_valid(event_id):
            return False
            
        result = db.db["events"].delete_one({"_id": ObjectId(event_id)})
        return result.deleted_count > 0
        
    except Exception as e:
        print("Error eliminando:", str(e))
        return False