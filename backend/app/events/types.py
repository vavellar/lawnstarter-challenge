from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from enum import Enum
from typing import Union


class EventType(str, Enum):
    QUERY_RECORDED = "QUERY_RECORDED"
    RECOMPUTE_STATS = "RECOMPUTE_STATS"


@dataclass
class QueryRecordedEvent:
    event_type: EventType
    query: str
    kind: str
    duration_ms: float
    timestamp: datetime

    @staticmethod
    def new(query: str, kind: str, duration_ms: float) -> "QueryRecordedEvent":
        return QueryRecordedEvent(
            event_type=EventType.QUERY_RECORDED,
            query=query.strip().lower(),
            kind=kind,
            duration_ms=duration_ms,
            timestamp=datetime.now(timezone.utc),
        )


@dataclass
class RecomputeStatsEvent:
    event_type: EventType
    timestamp: datetime

    @staticmethod
    def new() -> "RecomputeStatsEvent":
        return RecomputeStatsEvent(
            event_type=EventType.RECOMPUTE_STATS,
            timestamp=datetime.now(timezone.utc),
        )


Event = Union[QueryRecordedEvent, RecomputeStatsEvent]
