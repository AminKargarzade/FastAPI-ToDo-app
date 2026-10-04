from fastapi import FastAPI
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
