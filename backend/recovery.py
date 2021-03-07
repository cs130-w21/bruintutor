"""
recovery.py
==============
Endpoints for operations related to matching users. All routes start with
/api/recovery
All incoming request parameters are wrapped in a JSON body.
All outgoing response returns are wrapped in a JSON entry with key 'payload',
like this:

.. code-block::

    {
      "error": "false",
      "error-msg": None,
        "payload": {
        "return-1": "true"
      }
    }


Note that method documentation assumes you are using jsonResponse/errorResponse
to generate the response, and only shows the actual returns within payload.
Ditto for request parameters.
"""
import flask
from flask import (Blueprint, g, request, session, current_app)
from form_response import jsonResponse, errorResponse
import subprocess
import random
import string
import os
from werkzeug.security import generate_password_hash
random.seed()

baseurl = 'localhost'
if 'BASEURL' in os.environ:
    baseurl = os.environ['BASEURL']

bp = Blueprint('recovery', __name__, url_prefix='/api/recovery')

recoverystr = "echo -n \"From:recovery@bruintutor.com\nTo:{email}\n\
Subject:Password Reset Link\n\nHere is your password reset link:\n\
{baseurl}/reset/{secret}\n--Bruintutor\nNote: this link expires in 10 minutes.\" | exim {email}"

@bp.route('/forgot', methods=('POST',))
def forgot():
    """ POST submit a password reset request. Emails the user a recovery link.

        Parameters
        ----------
        email: str
            email to reset to

        Notes
        -----
        returns an empty response body on success.

        Raises
        ------
        BadRequest
            Some part of the required parameters is missing.
        EmailNotFound
            no user associated with email.
        ServerBad
            Mailserver is not functioning.
    """

    redis_client = current_app.config['RDSCXN']
    try:
        email = request.get_json(force=True)['email']
    except:
        return errorResponse('Bad request')

    for uid in redis_client.keys("user*"):
        if email == redis_client.hget(uid, 'email'):
            secret = ''.join(random.choices(string.ascii_letters, k=20))
            try:
                subprocess.call(
                    recoverystr.format(email=email, secret=secret, baseurl=baseurl),
                    shell = True)
                redis_client.setex(f"recovery{uid}", 600, secret)
                return jsonResponse()
            except:
                return errorResponse('Server bad')

    return errorResponse('Email not found')

@bp.route('/reset', methods=('POST',))
def reset ():
    """ POST complete a password reset request.

        Parameters
        ----------
        secret: str
            secret sent in email
        password: str
            new password

        Notes
        -----
        returns an empty response body on success.

        Raises
        ------
        BadRequest
            Some part of the required parameters is missing.
        NoRecovery
            No recovery has been requested.
    """
    redis_client = current_app.config['RDSCXN']
    try:
        d = request.get_json(force=True)
        secret, password = d['secret'], d['password']
    except:
        return errorResponse('Bad request')

    for uid in redis_client.keys("user*"):
        if secret == redis_client.get(f"recovery{uid}"):
            redis_client.hset(uid, 'password', generate_password_hash(password))
            redis_client.delete(f"recovery{uid}")
            return jsonResponse()
    return errorResponse('No recovery requested, or recovery expired')
