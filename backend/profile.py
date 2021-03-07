"""
profile.py
===============
Endpoints for operations related to matching users. All routes start with
/api/profile
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
import functools
import flask
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
from werkzeug.security import check_password_hash, generate_password_hash
from form_response import jsonResponse, errorResponse

bp = Blueprint('profile', __name__, url_prefix='/api/profile')

@bp.route('/edit', methods=('GET', 'POST'))
def edit():
    """ POST change attributes of a user profile.

        Parameters
        ----------
        firstName: str
        lastName: str
        major: str
        year: int
        classes: list(str)
        uid: str

        Notes
        -----
        returns empty json object on success.

        Raises
        ------
        BadRequest
            Some part of the required parameters is missing.
        UidNotFound
            Could not find the user in the database.
    """
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            error = 'Data Body Required'
            return errorResponse(error)
        fname = data['firstName'] if 'firstName' in data.keys() else ""
        lname = data['lastName'] if 'lastName' in data.keys() else ""
        major = data['major'] if 'major' in data.keys() else ""
        year = data['year'] if 'year' in data.keys() else ""
        classes = data['classes'] if 'classes' in data.keys() else []
        uid = data['uid'] if 'uid' in data.keys() else None
        error = None
        if uid is None:
            error = "uid required"
            return errorResponse(error)
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
            return jsonResponse()

        return errorResponse(error)
    return errorResponse('POST to this endpoint')


@bp.route('/get', methods=('GET', 'POST'))
def get():
    """ POST get attributes of a user profile.

        Parameters
        ----------
        uid: str
            uid of requested profile

        Returns
        -------
        firstName: str
        lastName: str
        major: str
        year: int
        classes: list(str)
        uid: str
        notifications: list(Notifications)
        Messages: list(Messages)
        isTutor: bool

        Raises
        ------
        BadRequest
            Some part of the required parameters is missing.
        UidNotFound
            Could not find the user in the database.

        See Also
        --------
        backend.message: messages module
        backend.notification: notifications modle
    """
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            error = 'Data Body Required'
            return errorResponse(error)
        uid = data['uid'] if 'uid' in data.keys() else None
        error = None
        if uid is None:
            error = "uid required"
            return errorResponse(error)
        user = redis_client.hgetall("user{}".format(uid))
        if user is None:
            error = "User with UID {} not found".format(uid)

        if error is None:
            classes = redis_client.lrange("classes{}".format(uid), 0, -1)
            return jsonResponse({'error': False,
                'firstName': user['fname'] if 'fname' in user.keys() else None,
                'lastName': user['lname'] if 'lname' in user.keys() else None,
                'year': user['year'] if 'year' in user.keys() else None,
                'major': user['major'] if 'major' in user.keys() else None,
                'classes': classes,
                'isTutor': user['isTutor']=="1" if 'isTutor' in user.keys() else None})

        return errorResponse(error)
    return errorResponse('POST to this endpoint')

@bp.route('/pictureUpload', methods=('GET', 'POST'))
def pictureUpload():
    """ POST upload a picture for the given user.

        Parameters
        ----------
        uid: str
            uid of requested profile
        profilePicUrl: str
            base64 encoded data string

        Notes
        -----
        method returns empty json object on success.

        Raises
        ------
        BadRequest
            Some part of the required parameters is missing.
        UidNotFound
            Could not find the user in the database.
    """
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            error = 'Data Body Required'
            return errorResponse(error)
        uid = data['uid'] if 'uid' in data.keys() else None
        profilePicUrl = data['profilePicUrl'] if 'profilePicUrl' in data.keys() else None
        if uid is None:
            error = 'uid is required.'
            return errorResponse(error)
        elif profilePicUrl is None:
            error = 'profilePicUrl is required.'
            return errorResponse(error)
        redis_client.set("picture{}".format(uid), profilePicUrl)
        return jsonResponse()
    return jsonResponse()

@bp.route('/pictureDownload', methods=('GET', 'POST'))
def pictureDownload():
    """ POST download the profile picture for the given user.

        Parameters
        ----------
        uid: str
            uid of requested profile

        Returns
        -------
        profilePicUrl: str
            base64 encoded data string or None

        Raises
        ------
        BadRequest
            Some part of the required parameters is missing.
        UidNotFound
            Could not find the user in the database.
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
        profilePicUrl = redis_client.get("picture{}".format(uid)) or ""
        return jsonResponse({'profilePicUrl': profilePicUrl})
    return jsonResponse()
