import json

def create_user(uid, fname, lname, major, classes, redis_client, isTutor, schedule):
    redis_client.hset("user{}".format(uid), key="fname", value=fname)
    redis_client.hset("user{}".format(uid), key="lname", value=lname)
    redis_client.hset("user{}".format(uid), key="major", value=major)
    redis_client.hset("user{}".format(uid), key="isTutor", value=isTutor)
    for time in create_schedule(schedule):
        redis_client.rpush("schedule{}".format(uid), time)

    redis_client.delete("classes{}".format(uid))
    for c in classes:
        redis_client.rpush("classes{}".format(uid), c)

def test_search(client, app):
    redis_client = app.config['RDSCXN']
    url = 'api/search/get'

    create_user(11, 'John', 'Doe', 'Computer Science', ['CS 180', 'CS 111'], redis_client, '1', [1, 15, 37])
    create_user(12, 'Jill', 'Doe', 'Biology', ['Bio 121', 'Bio 35', 'Bio 173'], redis_client, '1', [1, 22, 24])
    create_user(13, 'JDoNot', 'Show', 'Biology', ['Bio 35', 'CS 111'], redis_client, '0', [1, 22, 24])
    search_result({'name': 'J'}, [11, 12], client, url)
    search_result({'name': 'Jo'}, [11], client, url)
    search_result({'name': 'Ji', 'class': ['CS 180']}, [], client, url)
    search_result({'name': 'hn Do'}, [11], client, url)
    search_result({'major': 'Biology'}, [12], client, url)
    search_result({'name': 'Jill Doe', 'major': 'Biology', 'class': ['Bio 35']}, [12], client, url)
    search_result({'name': 'J', 'class': ['Bio 35', 'CS 111']}, [11, 12], client, url)
    search_result({'bytes': create_schedule([1])}, [11, 12], client, url)
    search_result({'bytes': create_schedule([15])}, [11], client, url)
    search_result({'bytes': create_schedule([17])}, [], client, url)


def search_result(values, expected, client, url):
    search1 = json.dumps(values)
    search1_response = client.post(url, headers={'Content-Type': 'application/json'}, data=search1)
    search1_response_json = search1_response.json
    assert search1_response.status_code == 200
    assert not search1_response_json['error']
    assert search1_response_json['payload'] == expected

def create_schedule(sched_list):
    schedule = [0]*42
    for i in range(42):
        if i in sched_list:
            schedule[i] = 1
    return schedule
