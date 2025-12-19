from fastapi import APIRouter, HTTPException, Query
from app.services.movies import search_movie, get_movie_by_id
from app.services.people import search_people_by_id
from app.helpers.extract_id import extract_id
from app.events.queue import publish_event
from app.events.types import QueryRecordedEvent
from app.schemas import MovieDetail, MovieSearchResult
import asyncio
import time

router = APIRouter(tags=["Movies"])

@router.get("/movies/details/{movie_id}", response_model=MovieDetail)
async def fetch_movie_details(movie_id: int):
    try:
        movie = await get_movie_by_id(movie_id)
        if not movie:
            raise HTTPException(status_code=404, detail=f"Movie {movie_id} not found.")

        character_urls = movie.get("characters", [])
        character_ids = [extract_id(url) for url in character_urls]

        character_tasks = [search_people_by_id(char_id) for char_id in character_ids]
        characters = await asyncio.gather(*character_tasks)

        movie["characters_details"] = [
            {"id": char_id, "name": char["name"]}
            for char_id, char in zip(character_ids, characters)
        ]

        return movie

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/movies", response_model=MovieSearchResult)
async def fetch_movies(search: str = Query(..., description="Search term for movies")):
    start = time.perf_counter()
    results = await search_movie(search)
    duration_ms = (time.perf_counter() - start) * 1000.0
    await publish_event(QueryRecordedEvent.new(query=search, kind="movies", duration_ms=duration_ms))
    if not results:
        raise HTTPException(status_code=404, detail="No results found for the provided search term.")
    return results