from fastapi import APIRouter, HTTPException, Query
from app.services.people import search_person, search_people_by_id
from app.services.movies import get_movie_by_id
from app.helpers.extract_id import extract_id
from app.events.queue import publish_event
from app.events.types import QueryRecordedEvent
from app.schemas import PersonDetail, PersonSearchResult
import asyncio
import time

router = APIRouter(tags=["People"])
@router.get("/people/details/{person_id}", response_model=PersonDetail)

async def fetch_person_details(person_id: int):
    start = time.perf_counter()
    try:
        people = await search_people_by_id(person_id)
        if not people:
            raise HTTPException(status_code=404, detail=f"Person {person_id} not found.")

        movie_urls = people.get("films", [])
        movie_ids = [extract_id(url) for url in movie_urls]

        movie_tasks = [get_movie_by_id(movie_id) for movie_id in movie_ids]
        movies = await asyncio.gather(*movie_tasks)

        people["films_details"] = [
            {
                "id": movie_id,
                "title": movie["title"]
            }
            for movie_id, movie in zip(movie_ids, movies)
        ]
        
        duration_ms = (time.perf_counter() - start) * 1000.0
        name = people.get("name", "")
        await publish_event(QueryRecordedEvent.new(query=name, kind="person_details", duration_ms=duration_ms))

        return people
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/people", response_model=PersonSearchResult)
async def fetch_people(search: str = Query(..., description="Search term for people")):
    start = time.perf_counter()
    results = await search_person(search)
    duration_ms = (time.perf_counter() - start) * 1000.0
    await publish_event(QueryRecordedEvent.new(query=search, kind="people", duration_ms=duration_ms))
    return results