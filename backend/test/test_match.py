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
    TUTOR_INFO['uid'] = 1
    STUDENT_INFO['uid'] = 2
    redis_client.hmset("user1", TUTOR_INFO)
    redis_client.hmset("user2", STUDENT_INFO)


# test initiate match
def test_initiate(client, app):
    redis_client = app.config['RDSCXN']

    set_users(redis_client)

    initate_url = 'api/match/initiate'
    initiate_data = json.dumps({
     "tutor": 1,
     "student": 2
    })
    initiate_response = client.post(initate_url, headers={'Content-Type': 'application/json'}, data=initiate_data)
    assert initiate_response.status_code == 200
    initiate_response_json = initiate_response.json
    assert not initiate_response_json['error']

    initiate_response = client.post(initate_url, headers={'Content-Type': 'application/json'}, data=initiate_data)
    assert initiate_response.status_code == 200
    initiate_response_json = initiate_response.json
    assert initiate_response_json['error']
    assert initiate_response_json['errMsg'] == 'student already requested match'

def test_tutorrespond(client, app):
    redis_client = app.config['RDSCXN']

    set_users(redis_client)
    redis_client.rpush('match_req1', 2)

    tutorrespond_url = 'api/match/tutorrespond'
    tutor_data = {
        "tutor": 1,
        "student": 2,
        "requestDecision": "no"
    }


    def test_tr(redis_client, tutor_data):
        tutor_data_json = json.dumps(tutor_data)
        return client.post(tutorrespond_url, headers={'Content-Type': 'application/json'}, data=tutor_data_json)

    tutor_response = test_tr(redis_client, tutor_data)
    assert tutor_response.status_code == 200
    tutor_response_json = tutor_response.json
    assert not tutor_response_json['error']
    assert redis_client.lrange('match_req1', 0, -1) == []

    redis_client.rpush('match_req1', 2)
    tutor_data['requestDecision'] = 'yes'
    tutor_response = test_tr(redis_client, tutor_data)
    assert tutor_response.status_code == 200
    tutor_response_json = tutor_response.json
    assert not tutor_response_json['error']
    assert redis_client.lrange('match_req1', 0, -1) == []
    assert redis_client.lrange('students1', 0, -1) == ['2']

    tutor_response = test_tr(redis_client, tutor_data)
    assert tutor_response.status_code == 200
    tutor_response_json = tutor_response.json
    assert tutor_response_json['errMsg'] == 'Student with UID 2 has not sent a request'

def test_tutor_check_request(client, app):
    redis_client = app.config['RDSCXN']

    set_users(redis_client)
    redis_client.rpush('match_req1', 2)

    tutorrespond_url = 'api/match/tutorCheckRequest'
    tutor_data = {
        "tutor": 1
    }

    tutor_data_json = json.dumps(tutor_data)
    tutor_response = client.get(tutorrespond_url, headers={'Content-Type': 'application/json'}, data=tutor_data_json)
    assert tutor_response.status_code == 200
    tutor_response_json = tutor_response.json
    assert not tutor_response_json['error']
    assert tutor_response_json['payload'] == ['2']

def test_student_check_response(client, app):
    redis_client = app.config['RDSCXN']

    set_users(redis_client)

    check_url = 'api/match/studentCheckResponse'
    data = {
        "tutor": 1,
        "student": 2
    }
    data_json = json.dumps(data)

    def check_request(status):
        response = client.get(check_url, headers={'Content-Type': 'application/json'}, data=data_json)
        assert response.status_code == 200
        response_json = response.json
        assert not response_json['error']
        assert response_json['payload'] == status

    check_request('no')

    redis_client.rpush('match_req1', 2)
    check_request('pending')

    redis_client.lrem('match_req1', 1, 2)
    redis_client.rpush('students1', 2)
    check_request('yes')