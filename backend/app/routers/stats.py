from fastapi import APIRouter

from app.stats.store import store


router = APIRouter(tags=["Statistics"])


@router.get("/stats")
async def get_stats():
    return await store.get_snapshot()
