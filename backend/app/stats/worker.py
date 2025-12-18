
from app.events.queue import get_queue
from app.events.types import EventType, QueryRecordedEvent, RecomputeStatsEvent
from app.stats.store import store


async def stats_worker() -> None:
    queue = get_queue()
    while True:
        ev = await queue.get()
        try:
            if ev is None:
                continue
            if getattr(ev, "event_type", None) == EventType.QUERY_RECORDED:
                assert isinstance(ev, QueryRecordedEvent)
                await store.add_query(ev)
            elif getattr(ev, "event_type", None) == EventType.RECOMPUTE_STATS:
                assert isinstance(ev, RecomputeStatsEvent)
                await store.recompute()
        finally:
            queue.task_done()
