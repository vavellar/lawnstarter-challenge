from pydantic import BaseModel
from typing import List, Dict, Optional


class QueryStat(BaseModel):
    query: str
    count: int
    percentage: float


class QueryTotals(BaseModel):
    count: int
    by_kind: Dict[str, int]


class ViewedPerson(BaseModel):
    name: str
    views: int


class ViewedMovie(BaseModel):
    title: str
    views: int


class StatsResponse(BaseModel):
    generated_at: Optional[str]
    top_queries: List[QueryStat]
    avg_duration_ms: float
    popular_hour_utc: Optional[int]
    totals: QueryTotals
    most_viewed_people: List[ViewedPerson] = []
    most_viewed_movie: List[ViewedMovie] = []
