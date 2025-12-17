from fastapi import FastAPI
from app.routers.people import router as people_router
from app.routers.movies import router as movies_router

app = FastAPI(title="People")

app.include_router(people_router)
app.include_router(movies_router)