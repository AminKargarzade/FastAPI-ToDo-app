from fastapi import APIRouter

router = APIRouter(tags=["tasks"])


@router.get(
    "/tasks/",
)
async def retrive_tasks_list():
    return []


@router.get(
    "/tasks/{task_id}",
)
async def retrive_task_detail(task_id: int):
    return []
