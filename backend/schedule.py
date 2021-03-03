import functools
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
import flask
from werkzeug.security import check_password_hash, generate_password_hash

import json
import datetime
from form_response import *

bp = Blueprint('schedule', __name__, url_prefix='/api/schedule')

@bp.route('/set', methods=('GET', 'POST'))
def set():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            error = 'Data Body Required'
            return errorResponse(error)
        uid = data['uid'] if 'uid' in data.keys() else None
        bytes = data['bytes'] if 'bytes' in data.keys() else None

        if uid is None:
            error = 'uid is required.'
            return errorResponse(error)
        elif bytes is None:
            error = 'bytes is required.'
            return errorResponse(error)

        redis_client.ltrim("schedule{}".format(uid), 1, 0)
        redis_client.rpush("schedule{}".format(uid), *bytes)
        return jsonResponse()
    return jsonResponse()

@bp.route('/get', methods=('GET', 'POST'))
def get():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            error = 'Data Body Required'
            return errorResponse(error)
        uid = data['uid'] if 'uid' in data.keys() else None

        if uid is None:
            error = 'uid is required.'
            return errorResponse(error)

        bytes = redis_client.lrange("schedule{}".format(uid), 0, -1)
        bytes = [int(i) for i in bytes]
        return jsonResponse({'bytes': bytes})
    return jsonResponse()
