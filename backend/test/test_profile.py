import json


# Testing the register() api
def test_edit(client, app):
    url = 'api/auth/register'
    json_data = {
        "firstName": "joe" ,
        "lastName": "bruin",
        "email": "joebruin@gmail.com",
        "password": "goBru1ns",
        "isTutor": False
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data)
    assert response.status_code == 200
    response_json = response.json
    assert not response_json['error']
    url = 'api/profile/edit'
    json_data = {
        "firstName": "j" ,
        "lastName": "b",
        "major": "CS",
        "year": 2021,
        "classes": ["CS 130", "CS 181"],
        "uid": "1"
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data)
    assert response.status_code == 200
    response_json = response.json
    assert not response_json['error']

    response = client.post(url, data=None)
    assert response.status_code == 400

# Testing the login() api
def test_get(client, app):
    test_edit(client, app)
    url = 'api/profile/get'
    json_data = {
        "uid": "1"
    }

    data = json.dumps(json_data)
    response = client.post(url, data=data)
    assert response.status_code == 200
    response_json = response.json['payload']
    assert not response_json['error']
    assert response_json['firstName'] == "j"
    assert response_json['lastName'] == "b"
    assert response_json['year'] == "2021"
    assert response_json['major'] == "CS"
    assert response_json['classes'] == ["CS 130", "CS 181"]
    assert not response_json['isTutor']

    response = client.post(url, data=None)
    assert response.status_code == 400

def test_pictureUpload(client, app):
    url = 'api/profile/pictureUpload'
    json_data = {
        "uid": "1",
        "profilePicUrl": "example.com/image.png"
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    response_json = response.json
    assert not response_json['error']

    response = client.post(url, data=None, headers={'Content-Type': 'application/json'})
    assert response.status_code == 400

def test_pictureDownload(client, app):
    test_pictureUpload(client, app)
    url = 'api/profile/pictureDownload'
    json_data = {
        "uid": "1"
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    response_json = response.json
    assert not response_json['error']
    assert response_json['payload']['profilePicUrl'] == "example.com/image.png"

    response = client.post(url, data=None, headers={'Content-Type': 'application/json'})
    assert response.status_code == 400
