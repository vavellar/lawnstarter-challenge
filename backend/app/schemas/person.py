from pydantic import BaseModel, Field
from typing import List, Optional


class FilmSummary(BaseModel):
    id: int
    title: str


class PersonBase(BaseModel):
    name: str
    height: Optional[str] = None
    mass: Optional[str] = None
    hair_color: Optional[str] = None
    skin_color: Optional[str] = None
    eye_color: Optional[str] = None
    birth_year: Optional[str] = None
    gender: Optional[str] = None


class PersonDetail(PersonBase):
    films_details: List[FilmSummary] = Field(default_factory=list)


class PersonSearchResult(BaseModel):
    count: int
    results: List[dict]
