import json

TUTOR_INFO = {
    "fname": "generic",
    "lname": "tutor",
    "email": "tutor@gmail.com",
    "password": "T00t3r",
    "isTutor": int(True)
}

STUDENT_INFO = {
    "fname": "generic" ,
    "lname": "user",
    "email": "user@gmail.com",
    "password": "Us3r",
    "isTutor": int(False)
}

def set_users(redis_client):
    TUTOR_INFO['uid'] = 10
    STUDENT_INFO['uid'] = 12
    redis_client.hmset("user10", TUTOR_INFO)
    redis_client.hmset("user12", STUDENT_INFO)


def test_tutorrespond(client, app):
    redis_client = app.config['RDSCXN']

    set_users(redis_client)

    tutorrespond_url = 'api/match/tutorrespond'
    tutor_data = {
        "tutor": 10,
        "student": 12,
    }
    tutor_data = json.dumps(tutor_data)

    response = client.post(tutorrespond_url, headers={'Content-Type': 'application/json'}, data=tutor_data)
    json_response = response.json
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    assert not json_response['error']
    assert redis_client.lrange('students10', 0, -1) == ['12']
    assert redis_client.lrange('tutor12', 0, -1) == ['10']

    tutor_data = json.dumps({"tutor": 1, "student": 12})
    response = client.post(tutorrespond_url, headers={'Content-Type': 'application/json'}, data=tutor_data)
    json_response = response.json
    assert response.status_code == 200
    assert json_response['error']
    assert json_response['errMsg'] == 'Tutor with UID 1 not found'

    tutor_data = json.dumps({"tutor": 10, "student": 1})
    response = client.post(tutorrespond_url, headers={'Content-Type': 'application/json'}, data=tutor_data)
    json_response = response.json
    assert response.status_code == 200
    assert json_response['error']
    assert json_response['errMsg'] == 'Student with UID 1 not found'

def initiate_lists(redis_client):
    redis_client.rpush('students12', 13)
    redis_client.rpush('students12', 27)
    redis_client.rpush('students12', 2021)

    redis_client.rpush('tutor2021', 12)

def test_get_user_list(client, app):
    redis_client = app.config['RDSCXN']

    user_list_url = 'api/match/getUserList'

    initiate_lists(redis_client)

    response = client.post(user_list_url, headers={'Content-Type': 'application/json'}, data=json.dumps({"uid": 12}))
    json_response = response.json
    assert response.status_code == 200
    assert not json_response['error']
    assert json_response['payload'] == [13, 27, 2021]

    response = client.post(user_list_url, headers={'Content-Type': 'application/json'}, data=json.dumps({"uid": 2021}))
    json_response = response.json
    assert response.status_code == 200
    assert not json_response['error']
    assert json_response['payload'] == [12]

    response = client.post(user_list_url, headers={'Content-Type': 'application/json'}, data=json.dumps({"uid": 13}))
    json_response = response.json
    assert response.status_code == 200
    assert not json_response['error']
    assert json_response['payload'] == []

    response = client.post(user_list_url, headers={'Content-Type': 'application/json'}, data=json.dumps({}))
    json_response = response.json
    assert response.status_code == 200
    assert json_response['error']
    assert json_response['errMsg'] == 'Please include User ID'

