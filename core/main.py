from fastapi import Depends, FastAPI
from contextlib import asynccontextmanager
from tasks.routes import router as tasks_routes
from users.routes import router as users_routes

tags_metadata = [
    {
        "name": "Tasks",
        "description": "Operations related to task management",
        "externalDocs": {
            "description": "More about tasks",
            "url": "https://example.com/docs/tasks",
        },
    },
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Application Startup")
    yield
    print("Application Shutdown")


app = FastAPI(
    title="ToDo Application",
    description="this is a section for description",
    version="0.0.1",
    terms_of_service="http://example.com/terms",
    contact={
        "name": "Amin Kargarzade",
        "url": "http://my_imaginary_website.com/contact/",
        "email": "aminkargarzadeh26@gmail.com",
    },
    license_info={
        "name": "MIT",
    },
    lifespan=lifespan,
    openapi_tags=tags_metadata,
)

app.include_router(tasks_routes)
app.include_router(users_routes)

# from fastapi.security import APIKeyHeader
from fastapi.security import APIKeyQuery
from auth.api_key_auth import get_api_key

# header_scheme = APIKeyHeader(name="x-key")
query_scheme = APIKeyQuery(name="api_key")


@app.get("/public")
def public_route():
    return {"message": "This is a public endpoint"}


@app.get("/private")
def private_route(api_key: str = Depends(query_scheme)):
    print(api_key)
    return {"message": "This is a private endpoint", "api_key": api_key}
