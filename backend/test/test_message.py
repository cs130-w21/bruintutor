import json

def test_add(client, app):
    url = 'api/message/add'
    json_data = {
        "from": "3" ,
        "to": "4",
        "msg": "A Message",
        "createdDate": 1
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
    url = 'api/message/add'
    json_data = {
        "from": "1" ,
        "to": "2",
        "msg": "Message1 from 1 to 2",
        "createdDate": 1
    }
    data = json.dumps(json_data)
    client.post(url, data=data, headers={'Content-Type': 'application/json'})
    json_data = {
        "from": "2" ,
        "to": "1",
        "msg": "Message2 from 2 to 1",
        "createdDate": 2
    }
    data = json.dumps(json_data)
    client.post(url, data=data, headers={'Content-Type': 'application/json'})
    json_data = {
        "from": "1" ,
        "to": "3",
        "msg": "Message3 from 1 to 3",
        "createdDate": 3
    }
    data = json.dumps(json_data)
    client.post(url, data=data, headers={'Content-Type': 'application/json'})
    json_data = {
        "from": "1" ,
        "to": "2",
        "msg": "Message4 from 1 to 2",
        "createdDate": 4
    }
    data = json.dumps(json_data)
    client.post(url, data=data, headers={'Content-Type': 'application/json'})
    json_data = {
        "from": "2" ,
        "to": "1",
        "msg": "Message0 from 2 to 1",
        "createdDate": 0
    }
    data = json.dumps(json_data)
    client.post(url, data=data, headers={'Content-Type': 'application/json'})
    url = 'api/message/get'
    json_data = {
        "uid1": "1" ,
        "uid2": "2"
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    response_json = response.json
    assert not response_json['error']
    messages = response_json['messages']
    assert len(messages) == 4
    assert messages[0]['msg'] == "Message0 from 2 to 1"
    assert messages[1]['msg'] == "Message1 from 1 to 2"
    assert messages[2]['msg'] == "Message2 from 2 to 1"
    assert messages[3]['msg'] == "Message4 from 1 to 2"

    response = client.post(url, data=None, headers={'Content-Type': 'application/json'})
    assert response.status_code == 400
