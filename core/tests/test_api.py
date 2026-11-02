from conftest import client


def test_login_response_401():
    payload = {"username": "invalid_user", "password": "invalid_password"}
    response = client.post("/users/login", json=payload)
    assert response.status_code == 401
