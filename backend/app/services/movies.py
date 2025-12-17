from app.helpers.http_service import HttpService
from app.settings import BASE_URL, DEFAULT_TIMEOUT
from typing import Optional, Dict, Any

http_service = HttpService(BASE_URL, DEFAULT_TIMEOUT)

endpoint = "/films/"

async def search_movie(query: str) -> Optional[Dict[str, Any]]:
    response = await http_service.get(f"{endpoint}?search={query}")
    if response and response.get("results"):
        return response
    return {"error": "No results found"}

async def get_movie_by_id(movie_id: int) -> Optional[Dict[str, Any]]:
    response = await http_service.get(f"{endpoint}{movie_id}/")
    if response:
        return response
    return None