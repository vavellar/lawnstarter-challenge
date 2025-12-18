import asyncio
from typing import Optional

from app.events.types import Event


_event_queue: Optional[asyncio.Queue[Event]] = None


def get_queue() -> asyncio.Queue[Event]:
    global _event_queue
    if _event_queue is None:
        _event_queue = asyncio.Queue()
    return _event_queue


async def publish_event(event: Event) -> None:
    queue = get_queue()
    await queue.put(event)
