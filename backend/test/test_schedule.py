import json

def test_set(client, app):
    url = 'api/schedule/set'
    json_data = {
        "uid": "1",
        "bytes": [0,1,1,0,1,1,0,1,1,0,1,1,0,0,1,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,1]
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
    url = 'api/schedule/set'
    json_data = {
        "uid": "1",
        "bytes": [0,1,1,0,1,1,0,1,1,0,1,1,0,0,1,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,1]
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})

    url = 'api/schedule/get'
    json_data = {
        "uid": "1"
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data, headers={'Content-Type': 'application/json'})
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    response_json = response.json
    assert not response_json['error']
    assert response_json['payload'] == {'bytes': [0,1,1,0,1,1,0,1,1,0,1,1,0,0,1,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,1]}

    response = client.post(url, data=None, headers={'Content-Type': 'application/json'})
    assert response.status_code == 400
