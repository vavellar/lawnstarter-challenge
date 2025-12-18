from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.people import router as people_router
from app.routers.movies import router as movies_router

app = FastAPI(title="People")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

app.include_router(people_router)
app.include_router(movies_router)
