from fastapi import Depends
from fastapi.security import APIKeyHeader

header_scheme = APIKeyHeader(name="x-key")


def get_api_key(api_key: str = Depends(header_scheme)):
    return {"api_key": api_key}
