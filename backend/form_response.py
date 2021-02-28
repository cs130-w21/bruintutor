from json import dumps
from flask import Response

def errorResponse(msg=''):
    return Response(status=200, content_type='application/json',
                    response=dumps({'error': True, 'errMsg': msg}))

def jsonResponse(body={}):
    return Response(status=200, content_type='application/json',
                    response=dumps({'error': False, 'errMsg': None, 'payload': body}))