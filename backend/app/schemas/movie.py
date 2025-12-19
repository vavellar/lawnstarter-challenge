from pydantic import BaseModel, Field
from typing import List, Optional


class CharacterSummary(BaseModel):
    id: int
    name: str


class MovieBase(BaseModel):
    title: str
    episode_id: Optional[int] = None
    opening_crawl: Optional[str] = None
    director: Optional[str] = None
    producer: Optional[str] = None
    release_date: Optional[str] = None


class MovieDetail(MovieBase):
    characters_details: List[CharacterSummary] = Field(default_factory=list)


class MovieSearchResult(BaseModel):
    count: int = 0
    results: List[dict] = Field(default_factory=list)
