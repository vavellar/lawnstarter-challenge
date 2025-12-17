from fastapi import FastAPI
from app.routers.people import router as people_router

app = FastAPI(title="People")

app.include_router(people_router)