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
                             'Medicine 99',
                            'Medicine M160A',
                            'Medicine M160B',
                            'Medicine 160C',
                            'Medicine 180',
                            'Medicine 185',
                            'Medicine 188SA',
                            'Medicine 188SB',
                            'Medicine 188SC',
                            'Medicine 199',
                            'Medicine M215',
                            'Medicine M256',
                            'Medicine M260A',
                            'Medicine M260B',
                            'Medicine M260C',
                            'Medicine M261',
                            'Medicine M263',
                            'Medicine M270C',
                            'Medicine M270D',
                            'Medicine M270E',
                            'Medicine M290A',
                            'Medicine M290B',
                            'Medicine 501']}}

    response = client.post(url, headers={'Content-Type': 'application/json'}, data=json.dumps({"randomBody": 1234}))
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    json_resp = json.loads(response.data)
    assert json_resp == {'error': True,
                         'errMsg': 'Subject Area Required'}
