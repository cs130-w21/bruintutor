import functools
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
import flask
from werkzeug.security import check_password_hash, generate_password_hash

import json
import datetime
from form_response import *

bp = Blueprint('message', __name__, url_prefix='/api/message')

@bp.route('/add', methods=('GET', 'POST'))
def add():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        fromUid = data['from'] if data else None
        toUid = data['to'] if data else None
        msg = data['msg'] if data else None
        createdDate = data['createdDate'] if data else None
        error = None

        if not fromUid:
            error = 'From UID is required.'
        elif not toUid:
            error = 'To UID is required.'
        elif msg is None:
            error = 'Message is required'
        elif createdDate is None:
            error = 'Created Date is required.'
        if error:
            return errorResponse(error)

        next_mid = redis_client.get('next_mid')
        redis_client.incr('next_mid')
        redis_client.hmset("msg{}".format(next_mid), {'from': fromUid, 'to': toUid, 'msg': msg, 'createdDate': createdDate})
        return jsonResponse()

    return jsonResponse()

def sortByDate(msg):
    return msg['createdDate']

@bp.route('/get', methods=('GET', 'POST'))
def get():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        uid1 = data['uid1'] if data else None
        uid2 = data['uid2'] if data else None
        error = None

        if not uid1:
            error = 'uid1 is required'
        elif not uid2:
            error = 'uid2 is required'
        if error:
            return errorResponse(error)

        retMessages = []
        next_mid = int(redis_client.get("next_mid"))
        for mid in range(1,next_mid):
            msg = redis_client.hgetall("msg{}".format(mid))
            if (msg and msg['from'] == uid1 and msg['to'] == uid2) or (msg['from'] == uid2 and msg['to'] == uid1):
                retMessages.append(msg)
        retMessages.sort(key=sortByDate)
        return jsonResponse({'messages': retMessages})

    return jsonResponse()
