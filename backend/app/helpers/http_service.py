import httpx
from typing import Union


class HttpService:
    def __init__(self, base_url: str, timeout: int = 10):
        self.base_url = base_url
        self.timeout = timeout

    async def get(self, endpoint: str, headers: dict = None, params: dict = None) -> Union[dict, None]:
        async with httpx.AsyncClient(base_url=self.base_url, timeout=self.timeout) as client:
            try:
                response = await client.get(endpoint, headers=headers, params=params)
                print(response)
                response.raise_for_status()
                return response.json()
            except httpx.HTTPStatusError:
                print(f"Erro HTTP {response.status_code}: {response.text}")
            except httpx.RequestError as exc:
                print(f"Erro de requisição: {exc}")
            return None