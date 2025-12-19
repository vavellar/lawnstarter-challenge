from fastapi import APIRouter

from app.stats.store import store
from app.schemas import StatsResponse


router = APIRouter(tags=["Statistics"])


@router.get("/stats", response_model=StatsResponse)
async def get_stats():
    return await store.get_snapshot()
