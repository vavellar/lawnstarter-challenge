from fastapi import APIRouter

from app.stats.store import store


router = APIRouter()


@router.get("/stats")
async def get_stats():
    return await store.get_snapshot()
