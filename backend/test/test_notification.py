import json
import sys
def test_add(client, app):
    url = 'api/notification/add'
    json_data = {
        "uid": "1",
        "notification": {
            "msg": "test message",
            "createdDate": 1,
            "read": False,
            "type": "MESSAGE",
            "from": "2",
            "to": "1"
        }
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    response_json = response.json
    assert not response_json['error']

    response = client.post(url, data=None, headers={'Content-Type': 'application/json'})
    assert response.status_code == 400

def test_get(client, app):
    url = 'api/notification/add'
    json_data = {
        "uid": "1",
        "notification": {
            "msg": "test message 1",
            "createdDate": 1,
            "read": False,
            "type": "MESSAGE",
            "from": "2",
            "to": "1"
        }
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})
    json_data = {
        "uid": "1",
        "notification": {
            "msg": "test message 2",
            "createdDate": 2,
            "read": True,
            "type": "MESSAGE",
            "from": "3",
            "to": "1"
        }
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})

    url = 'api/notification/get'
    json_data = {
        "uid": "1"
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    response_json = response.json
    assert not response_json['error']
    notifs = response_json['payload']['notification']
    print(notifs, file=sys.stderr)
    assert len(notifs) == 2
    assert {
        "msg": "test message 2",
        "createdDate": 2,
        "read": True,
        "type": "MESSAGE",
        "from": "3",
        "to": "1"
        } in notifs
    assert {
        "msg": "test message 1",
        "createdDate": 1,
        "read": False,
        "type": "MESSAGE",
        "from": "2",
        "to": "1"
        } in notifs

    response = client.post(url, data=None, headers={'Content-Type': 'application/json'})
    assert response.status_code == 400

def test_delete(client, app):
    url = 'api/notification/add'
    json_data = {
        "uid": "2",
        "notification": {
            "msg": "test message 1",
            "createdDate": 1,
            "read": False,
            "type": "MESSAGE",
            "from": "1",
            "to": "2"
        }
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})
    json_data = {
        "uid": "2",
        "notification": {
            "msg": "test message 2",
            "createdDate": 2,
            "read": True,
            "type": "MESSAGE",
            "from": "3",
            "to": "2"
        }
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})

    url = 'api/notification/delete'
    json_data = {
        "uid": "2",
        "notificationID": "1"
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    response_json = response.json
    assert not response_json['error']
    url = 'api/notification/get'
    json_data = {
        "uid": "2"
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})
    response_json = response.json
    notifs = response_json['payload']['notification']
    assert {
        "msg": "test message 2",
        "createdDate": 2,
        "read": True,
        "type": "MESSAGE",
        "from": "3",
        "to": "2"
        } in notifs

    response = client.post(url, data=None, headers={'Content-Type': 'application/json'})
    assert response.status_code == 400
