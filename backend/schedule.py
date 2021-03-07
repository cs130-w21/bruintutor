"""
schedule.py
==============
Endpoints for operations related to matching users. All routes start with
/api/schedule
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

Scheduling blocks are from 9am - 9pm in two hour incrememts for 6 blocks a day,
7 days a week. We index into a scheduling array by 6*day + block.
"""
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
    """ POST set schedule for user.

        Parameters
        ----------
        uid: str
        bytes: int[42]
            see module description for magic 42.

        Notes
        -----
        returns an empty response body on success.

        Raises
        ------
        BadRequest
            Some part of the required parameters is missing.
    """
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
    """ POST get schedule for user.

        Parameters
        ----------
        uid: str

        Returns
        -------
        bytes: int[42]
            see module description for magic 42.

        Raises
        ------
        BadRequest
            Some part of the required parameters is missing.
    """
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
