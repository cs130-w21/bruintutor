"""
form_response.py
================
Helper methods for generating response objects. All response objects are
generated like this:

.. code-block::

    {
      "error": "false",
      "error-msg": None,
        "payload": {
        "return-1": "true"
      }
    }
"""

from json import dumps
from flask import Response

def errorResponse(msg=''):
    """Formulate a response return that is an error.
    Parameters
    ---------
    msg: str
        error message to return to frontend.

    Returns
    -------
    _ : Response object
        object suitable for reply over HTTP with a correctly formulated JSON body.
    """
    return Response(status=200, content_type='application/json',
                    response=dumps({'error': True, 'errMsg': msg}))

def jsonResponse(body={}):
    """Formulate a response return that is successful.
    Parameters
    ---------
    body: dict
        dictionary of keys and their values to send with as the response

    Returns
    -------
    _ : Response object
        object suitable for reply over HTTP with a correctly formulated JSON body.
    """
    return Response(status=200, content_type='application/json',
                    response=dumps({'error': False, 'errMsg': None, 'payload': body}))
