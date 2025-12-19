from pydantic import BaseModel
from typing import List, Dict, Optional


class QueryStat(BaseModel):
    query: str
    count: int
    percentage: float


class QueryTotals(BaseModel):
    count: int
    by_kind: Dict[str, int]


class StatsResponse(BaseModel):
    generated_at: Optional[str]
    top_queries: List[QueryStat]
    avg_duration_ms: float
    popular_hour_utc: Optional[int]
    totals: QueryTotals
