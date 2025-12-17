from fastapi import APIRouter, HTTPException, Query
from app.services.people import search_person, search_people_by_id
from app.services.movies import get_movie_by_id
from app.helpers.extract_id import extract_id
import asyncio

router = APIRouter()
@router.get("/people/details/{person_id}")

async def fetch_person_details(person_id: int):
    try:
        results = await search_people_by_id(person_id)

        movie_urls = results.get("films", [])
        movie_ids = [extract_id(url) for url in movie_urls]

        movie_tasks = [get_movie_by_id(movie_id) for movie_id in movie_ids]
        movies = await asyncio.gather(*movie_tasks)

        results["films_details"] = [
            {
                "id": movie_id,
                "title": movie["title"]
            }
            for movie_id, movie in zip(movie_ids, movies)
        ]

        return results

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/people")
async def fetch_people(search: str = Query(..., description="Search term for people")):
  
    results = await search_person(search)
    if not results:
        raise HTTPException(status_code=404, detail="No results found for the provided search term.")
    return results