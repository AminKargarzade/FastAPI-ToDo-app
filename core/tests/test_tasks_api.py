def test_tasks_list_response_401(anon_client):

    response = anon_client.get("/tasks")
    assert response.status_code == 401


def test_tasks_list_response_200(auth_client):

    response = auth_client.get("/tasks")
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_tasks_detail_response_200(auth_client, random_task):
    task_obj = random_task
    response = auth_client.get(f"/tasks/{task_obj.id}")
    assert response.status_code == 200


def test_tasks_detail_response_404(auth_client):
    response = auth_client.get("/tasks/1000")
    assert response.status_code == 404
