from fastapi import FastAPI
from db import connect_to_mongo, close_mongo_connection
from routers.auth import router as auth_router
from routers.events import router as events_router
from fastapi.middleware.cors import CORSMiddleware
from routers.product import router as product_router
from routers.book_router import router as book_router
from routers.author_router import router as author_router
from routers.phone import router as phone_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="My Event App",
    version="0.1.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o pon tu frontend ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Añade el middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # quién puede llamar
    allow_credentials=True,         # si se permiten cookies/credenciales
    allow_methods=["*"],            # qué métodos HTTP se permiten
    allow_headers=["*"],            # qué cabeceras se permiten
)

def startup_db_client():
    connect_to_mongo()
app.add_event_handler("startup", startup_db_client)

def shutdown_db_client():
    close_mongo_connection()
app.add_event_handler("shutdown", shutdown_db_client)

#app.include_router(users_router, prefix="/users", tags=["users"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(events_router, prefix="/events", tags=["events"])
app.include_router(product_router, prefix="/products", tags=["products"])
app.include_router(book_router, prefix="/books", tags=["books"])
app.include_router(author_router, prefix="/authors", tags=["authors"])
app.include_router(phone_router, prefix="/phones", tags=["phones"])
