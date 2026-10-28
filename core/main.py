from fastapi import Depends, FastAPI, Response, Request
from contextlib import asynccontextmanager
from tasks.routes import router as tasks_routes
from users.routes import router as users_routes
import time
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

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


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.perf_counter()
    # print("Before")
    response = await call_next(request)
    # print("After")
    process_time = time.perf_counter() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enabling Gzip for compressing responses more than 1000 bytes
app.add_middleware(GZipMiddleware, minimum_size=1000)
