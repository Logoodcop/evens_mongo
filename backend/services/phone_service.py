from models.phone import Phone

phones_db = {}

def create_phone(phone: Phone) -> Phone:
    phones_db[phone.id] = phone
    return phone

def get_phone(phone_id: str) -> Phone | None:
    return phones_db.get(phone_id)

def list_phones() -> list[Phone]:
    return list(phones_db.values())

def update_phone(phone_id: str, updated_phone: Phone) -> Phone | None:
    if phone_id in phones_db:
        phones_db[phone_id] = updated_phone
        return updated_phone
    return None

def delete_phone(phone_id: str) -> bool:
    if phone_id in phones_db:
        del phones_db[phone_id]
        return True
    return False
