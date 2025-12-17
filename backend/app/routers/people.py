from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any
from app.services.people import search_person, get_person

router = APIRouter()
@router.get("/people/details/{person_id}")
async def fetch_person_details(person_id: int):

    person = await get_person(person_id)
    if not person:
        raise HTTPException(status_code=404, detail=f"Pessoa com ID {person_id} não encontrada.")
    return person


@router.get("/people")
async def fetch_people(search: str = Query(..., description="Search term for people")):
  
    results = await search_person(search)
    if not results:
        raise HTTPException(status_code=404, detail="No results found for the provided search term.")
    return results