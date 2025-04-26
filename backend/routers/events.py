from fastapi import APIRouter, HTTPException
from models.event import Event
from services.event_service import create_event, get_event, list_events
from services.event_service import update_event
from services.event_service import delete_event



router = APIRouter()

@router.post("/", response_model=Event)
def create_event_endpoint(event: Event):
    return create_event(event)

@router.get("/{event_id}", response_model=Event)
def get_event_endpoint(event_id: str):
    event = get_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.get("/", response_model=list[Event])
def list_events_endpoint():
    return list_events()



@router.put("/{event_id}", response_model=Event)
def update_event_endpoint(event_id: str, updated_event: Event):
    event = update_event(event_id, updated_event)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.delete("/{event_id}")
def delete_event_endpoint(event_id: str):
    success = delete_event(event_id)
    if not success:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted"}


