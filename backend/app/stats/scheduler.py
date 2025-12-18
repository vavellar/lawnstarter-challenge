import asyncio

from app.events.queue import publish_event
from app.events.types import RecomputeStatsEvent


async def stats_scheduler(interval_seconds: int = 300) -> None:
    await publish_event(RecomputeStatsEvent.new())
    while True:
        await asyncio.sleep(interval_seconds)
        await publish_event(RecomputeStatsEvent.new())
