from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class TaskBaseSchema(BaseModel):
    title: str = Field(
        ..., max_length=150, min_length=5, description="The title of the task"
    )
    description: Optional[str] = Field(None, max_length=500, description="A detailed description of the task")  # type: ignore
    is_completed: bool = Field(..., description="Indicates if the task is completed")


class TaskCreateSchema(TaskBaseSchema):
    pass


class TaskUpdateSchema(TaskBaseSchema):
    pass


class TaskResponseSchema(TaskBaseSchema):
    id: int = Field(..., description="The unique identifier of the task")

    created_date: datetime = Field(
        ..., description="The timestamp when the task was created"
    )
    updated_date: datetime = Field(
        ..., description="The timestamp when the task was last updated"
    )
