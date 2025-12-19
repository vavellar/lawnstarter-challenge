from __future__ import annotations

import asyncio
from collections import Counter, defaultdict
from datetime import datetime
from typing import Any, Dict, List

from app.events.types import QueryRecordedEvent


class StatsStore:
    def __init__(self) -> None:
        self._queries: List[QueryRecordedEvent] = []
        self._snapshot: Dict[str, Any] = {
            "generated_at": None,
            "top_queries": [],
            "avg_duration_ms": 0.0,
            "popular_hour_utc": None,
            "totals": {"count": 0, "by_kind": {}},
            "most_viewed_people": [],
            "most_viewed_movie": [],
        }
        self._lock = asyncio.Lock()

    async def add_query(self, ev: QueryRecordedEvent) -> None:
        async with self._lock:
            self._queries.append(ev)

    async def recompute(self) -> None:
        async with self._lock:
            total = len(self._queries)
            if total == 0:
                self._snapshot = {
                    "generated_at": datetime.utcnow().isoformat() + "Z",
                    "top_queries": [],
                    "avg_duration_ms": 0.0,
                    "popular_hour_utc": None,
                    "totals": {"count": 0, "by_kind": {}},
                    "most_viewed_people": [],
                    "most_viewed_movie": [],
                }
                return

            counts = Counter(q.query for q in self._queries)
            top_five = counts.most_common(5)
            top_list = [
                {
                    "query": q,
                    "count": c,
                    "percentage": round((c / total) * 100.0, 2),
                }
                for q, c in top_five
            ]

            avg_duration = sum(q.duration_ms for q in self._queries) / total

            by_hour = defaultdict(int)
            for q in self._queries:
                h = q.timestamp.hour
                by_hour[h] += 1
            popular_hour = max(by_hour.items(), key=lambda kv: kv[1])[0] if by_hour else None

            by_kind = Counter(q.kind for q in self._queries)

            person_views = Counter(q.query for q in self._queries if q.kind == "person_details")
            movie_views = Counter(q.query for q in self._queries if q.kind == "movie_details")
            
            most_viewed_people_list = [
                {"name": name, "views": count}
                for name, count in person_views.most_common(5)
                if name
            ]
            most_viewed_movie_list = [
                {"title": title, "views": count}
                for title, count in movie_views.most_common(5)
                if title
            ]

            self._snapshot = {
                "generated_at": datetime.utcnow().isoformat() + "Z",
                "top_queries": top_list,
                "avg_duration_ms": round(avg_duration, 2),
                "popular_hour_utc": popular_hour,
                "totals": {"count": total, "by_kind": dict(by_kind)},
                "most_viewed_people": most_viewed_people_list,
                "most_viewed_movie": most_viewed_movie_list,
            }

    async def get_snapshot(self) -> Dict[str, Any]:
        async with self._lock:
            return dict(self._snapshot)


store = StatsStore()
