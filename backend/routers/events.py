from fastapi import APIRouter, HTTPException, status
from datetime import datetime
from models.event import Event, EventStatus, EventCancelReason
from db import events_collection
from bson import ObjectId

router = APIRouter()

@router.post(
    "/{event_id}/cancel",
    response_model=Event,
    responses={
        404: {"description": "Evento no encontrado"},
        400: {"description": "Evento ya cancelado"}
    }
)
async def cancel_event(
    event_id: str,
    reason: EventCancelReason,
    notes: Optional[str] = None
):
    # Verificar si el evento existe
    event = await events_collection.find_one({"_id": ObjectId(event_id)})
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evento no encontrado"
        )

    # Verificar si ya está cancelado
    if event.get("status") == EventStatus.CANCELED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El evento ya está cancelado"
        )

    # Actualizar el evento
    update_data = {
        "status": EventStatus.CANCELED,
        "cancel_reason": reason,
        "canceled_at": datetime.utcnow()
    }
    if notes:
        update_data["cancel_notes"] = notes

    await events_collection.update_one(
        {"_id": ObjectId(event_id)},
        {"$set": update_data}
    )

    # Devolver el evento actualizado
    updated_event = await events_collection.find_one({"_id": ObjectId(event_id)})
    return Event(**updated_event)