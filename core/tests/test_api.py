def test_login_response_401(anon_client):
    payload = {"username": "invalid_user", "password": "invalid_password"}
    response = anon_client.post("/users/login", json=payload)
    assert response.status_code == 401


def test_register_response_201(anon_client):
    payload = {
        "username": "invalid_user",
        "password": "invalid_password",
        "password_confirm": "invalid_password",
    }
    response = anon_client.post("/users/register", json=payload)
    assert response.status_code == 201
    assert response.json()["username"] == "invalid_user"
