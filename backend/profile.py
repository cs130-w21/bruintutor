import functools
import flask
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
from werkzeug.security import check_password_hash, generate_password_hash
import json

bp = Blueprint('profile', __name__, url_prefix='/api/profile')

@bp.route('/edit', methods=('GET', 'POST'))
def edit():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json(force=True)
        fname = data['firstName']
        lname = data['lastName']
        major = data['major']
        year = data['year']
        classes = data['classes']
        uid = data['uid']
        error = None

        if not redis_client.keys("user{}".format(uid)):
            error = "User with UID {} not found".format(uid)

        if error is None:
            redis_client.hset("user{}".format(uid), key="fname", value=fname)
            redis_client.hset("user{}".format(uid), key="lname", value=lname)
            redis_client.hset("user{}".format(uid), key="major", value=major)
            redis_client.hset("user{}".format(uid), key="year", value=year)
            redis_client.delete("classes{}".format(uid))
            for c in classes:
                redis_client.rpush("classes{}".format(uid), c)
            resp_body_json = json.dumps({'error': False})
            return flask.Response(status=200, content_type='application/json', response=resp_body_json)

        resp_body_json = json.dumps({'error': True, 'errMsg': error})
        return flask.Response(status=200, content_type='application/json', response=resp_body_json)

    return flask.Response(status=200, response='')

@bp.route('/get', methods=('GET', 'POST'))
def get():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json(force=True)
        uid = data['uid']
        error = None
        user = redis_client.hgetall("user{}".format(uid))
        if user is None:
            error = "User with UID {} not found".format(uid)

        if error is None:
            classes = redis_client.lrange("classes{}".format(uid), 0, -1)
            resp_body_json = json.dumps({'error': False,
            'firstName': user['fname'] if 'fname' in user.keys() else None,
            'lastName': user['lname'] if 'lname' in user.keys() else None,
            'year': user['year'] if 'year' in user.keys() else None,
            'major': user['major'] if 'major' in user.keys() else None,
            'classes': classes,
            'isTutor': user['isTutor']=="1" if 'isTutor' in user.keys() else None})
            return flask.Response(status=200, content_type='application/json', response=resp_body_json)

        resp_body_json = json.dumps({'error': True, 'errMsg': error})
        return flask.Response(status=200, content_type='application/json', response=resp_body_json)

    return flask.Response(status=200, response='')
