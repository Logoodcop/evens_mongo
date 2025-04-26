from fastapi import APIRouter, HTTPException
from models.phone import Phone
from services.phone_service import create_phone, get_phone, list_phones
from services.phone_service import update_phone
from services.phone_service import delete_phone

router = APIRouter()

@router.post("/", response_model=Phone)
def create_phone_endpoint(phone: Phone):
    return create_phone(phone)

@router.get("/{phone_id}", response_model=Phone)
def get_phone_endpoint(phone_id: str):
    phone = get_phone(phone_id)
    if not phone:
        raise HTTPException(status_code=404, detail="Phone not found")
    return phone

@router.get("/", response_model=list[Phone])
def list_phones_endpoint():
    return list_phones()

@router.put("/{phone_id}", response_model=Phone)
def update_phone_endpoint(phone_id: str, updated_phone: Phone):
    phone = update_phone(phone_id, updated_phone)
    if not phone:
        raise HTTPException(status_code=404, detail="Phone not found")
    return phone

@router.delete("/{phone_id}")
def delete_phone_endpoint(phone_id: str):
    success = delete_phone(phone_id)
    if not success:
        raise HTTPException(status_code=404, detail="Phone not found")
    return {"message": "Phone deleted"}
