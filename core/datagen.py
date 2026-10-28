from core.database import SessionLocal
from sqlalchemy.orm import Session
from users.models import UserModel
from tasks.models import TaskModel
from faker import Faker

fake = Faker()


def seed_users(db):
    user = UserModel(username=fake.user_name())
    user.set_password("123")
    db.add(user)
    db.commit()
    db.refresh(user)
    print(f"Seeded user: {user.username} with password '123' and ID: {user.id}")
    return user


def seed_tasks(db, user, count=10):
    tasks_list = []
    for _ in range(count):
        tasks_list.append(
            TaskModel(
                user_id=user.id,
                title=fake.sentence(nb_words=6),
                description=fake.text(),
                is_completed=fake.boolean(),
            )
        )
    db.add_all(tasks_list)
    db.commit()
    print(f"Seeded {count} tasks for user_id: {user.id}")


def main():
    db = SessionLocal()

    try:
        user = seed_users(db)
        seed_tasks(db, user)
    finally:
        db.close()


if __name__ == "__main__":
    main()
