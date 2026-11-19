import os

os.environ["SQLALCHEMY_DATABASE_URL"] = "sqlite:///:memory:"

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import sessionmaker

from core.database import Base, get_db
from main import app
from faker import Faker
from users.models import UserModel
from tasks.models import TaskModel

fake = Faker()

engine = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# module fixture but 2 of them !
@pytest.fixture(scope="package")
def db_session():
    db = TestSessionLocal()
    try:
        yield db
    finally:
        db.close()


# module fixture
@pytest.fixture(scope="module", autouse=True)
def override_dependencies(db_session):
    app.dependency_overrides[get_db] = lambda: db_session
    yield
    app.dependency_overrides.pop(get_db, None)


# session fixture
@pytest.fixture(scope="session", autouse=True)
def tear_up_and_down_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


# function fixture
@pytest.fixture(scope="function")
def anon_client():
    client = TestClient(app)
    yield client


@pytest.fixture(scope="package", autouse=True)
def generate_mock_data(db_session):
    user = UserModel(username="testuser")
    user.set_password("123")
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    print(f"Seeded user: {user.username} with password '123' and ID: {user.id}")

    tasks_list = []
    for _ in range(10):
        tasks_list.append(
            TaskModel(
                user_id=user.id,
                title=fake.sentence(nb_words=6),
                description=fake.text(),
                is_completed=fake.boolean(),
            )
        )
    db_session.add_all(tasks_list)
    db_session.commit()
    print(f"Seeded 10 tasks for user_id: {user.id}")
