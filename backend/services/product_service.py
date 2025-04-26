from typing import List, Optional
from bson import ObjectId
from models.product import Product
import db

def create_product(product: Product) -> Product:
    """Crea un producto en MongoDB y retorna el modelo con ID."""
    data = product.dict(by_alias=True, exclude={"id"})  # Excluye 'id' y usa alias "_id"
    result = db.db["products"].insert_one(data)
    product.id = str(result.inserted_id)  # Asigna el ObjectId como string
    return product

def get_product(product_id: str) -> Optional[Product]:
    """Obtiene un producto por ID o retorna None si no existe."""
    if not ObjectId.is_valid(product_id):
        return None
        
    doc = db.db["products"].find_one({"_id": ObjectId(product_id)})
    if doc:
        doc["id"] = str(doc["_id"])  # Renombra "_id" a "id"
        del doc["_id"]
        return Product(**doc)
    return None

def list_products() -> List[Product]:
    """Lista todos los productos en la colección."""
    products: List[Product] = []
    for doc in db.db["products"].find():
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        products.append(Product(**doc))
    return products

def update_product(product_id: str, updated_product: Product) -> Optional[Product]:
    """Actualiza un producto y retorna el modelo actualizado o None."""
    if not ObjectId.is_valid(product_id):
        return None
        
    data = updated_product.dict(by_alias=True, exclude={"id"})
    result = db.db["products"].find_one_and_update(
        {"_id": ObjectId(product_id)},
        {"$set": data},
        return_document=True
    )
    if result:
        result["id"] = str(result["_id"])
        del result["_id"]
        return Product(**result)
    return None

def delete_product(product_id: str) -> bool:
    """Elimina un producto y retorna True si fue exitoso."""
    try:
        if not ObjectId.is_valid(product_id):
            return False
            
        result = db.db["products"].delete_one({"_id": ObjectId(product_id)})
        return result.deleted_count > 0
    except Exception as e:
        print(f"Error eliminando producto: {e}")
        return False