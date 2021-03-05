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
