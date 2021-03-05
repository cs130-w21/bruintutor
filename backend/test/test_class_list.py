import json

def test_class_list(client, app):
    url = 'api/classList/get'
    json_data = {
        "subjectArea": "Medicine"
    }

    data = json.dumps(json_data)
    response = client.post(url, headers={'Content-Type': 'application/json'}, data=data)
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    json_resp = json.loads(response.data)
    assert json_resp == {'error': False,
                         'errMsg': None,
                         'payload': {'classList': [
                             "Medicine 19",
                             'Medicine 188SB']}}

    response = client.post(url, headers={'Content-Type': 'application/json'}, data=json.dumps({"randomBody": 1234}))
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    json_resp = json.loads(response.data)
    assert json_resp == {'error': True,
                         'errMsg': 'Subject Area Required'}
