from fastapi import APIRouter, HTTPException
from models.product import Product
from services.product_service import (
    create_product,
    get_product,
    list_products,
    update_product,
    delete_product
)

router = APIRouter()

@router.post("/", response_model=Product)
async def create_product_endpoint(product: Product):
    """Crea un nuevo producto."""
    return create_product(product)

@router.get("/{product_id}", response_model=Product)
async def get_product_endpoint(product_id: str):
    """Obtiene un producto por su ID."""
    product = get_product(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/", response_model=list[Product])
async def list_products_endpoint():
    """Lista todos los productos disponibles."""
    return list_products()

@router.put("/{product_id}", response_model=Product)
async def update_product_endpoint(product_id: str, updated_product: Product):
    """Actualiza un producto existente."""
    product = update_product(product_id, updated_product)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.delete("/{product_id}")
async def delete_product_endpoint(product_id: str):
    """Elimina un producto."""
    success = delete_product(product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}