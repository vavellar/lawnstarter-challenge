import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.people import router as people_router
from app.routers.movies import router as movies_router
from app.routers.stats import router as stats_router
from app.stats.worker import stats_worker
from app.stats.scheduler import stats_scheduler

app = FastAPI(title="Lawnstarter Challenge API docs", description="This is a sample API for the Lawnstarter coding challenge.", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

app.include_router(people_router)
app.include_router(movies_router)
app.include_router(stats_router)


@app.on_event("startup")
async def startup_event():
    app.state._bg_tasks = []
    worker_task = asyncio.create_task(stats_worker())
    scheduler_task = asyncio.create_task(stats_scheduler())
    app.state._bg_tasks.extend([worker_task, scheduler_task])


@app.on_event("shutdown")
async def shutdown_event():
    tasks = getattr(app.state, "_bg_tasks", [])
    for t in tasks:
        t.cancel()
    if tasks:
        await asyncio.gather(*tasks, return_exceptions=True)
