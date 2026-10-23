from fastapi import Depends, FastAPI, Response, Request
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

from auth.jwt_auth import get_authenticated_user


@app.get("/public")
def public_route():
    return {"message": "This is a public endpoint"}


@app.get("/private")
def private_route(user=Depends(get_authenticated_user)):
    print(user.id)
    return {"message": "This is a private endpoint"}


@app.post("/set-cookie")
def set_cookie(response: Response):
    response.set_cookie(key="test", value="something")
    return {"message": "Cookie 'test' has been set"}


@app.get("/get-cookie")
def get_cookie(request: Request):
    cookie_value = request.cookies.get("test")
    return {"message": f"Cookie 'test' has value: {cookie_value}"}
