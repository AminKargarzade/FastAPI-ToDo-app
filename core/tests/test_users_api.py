def test_login_invalid_data_response_401(anon_client):
    payload = {"username": "invalid_user", "password": "invalid_password"}
    response = anon_client.post("/users/login", json=payload)
    assert response.status_code == 401

    payload = {"username": "testuser", "password": "invalid_password"}
    response = anon_client.post("/users/login", json=payload)
    assert response.status_code == 401


def test_login_response_200(anon_client):
    payload = {"username": "testuser", "password": "123"}
    response = anon_client.post("/users/login", json=payload)
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "refresh_token" in response.json()


def test_register_response_201(anon_client):
    payload = {
        "username": "invalid_user",
        "password": "invalid_password",
        "password_confirm": "invalid_password",
    }
    response = anon_client.post("/users/register", json=payload)
    assert response.status_code == 201
    assert response.json()["username"] == "invalid_user"
