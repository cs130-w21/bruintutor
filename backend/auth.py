"""
auth.py
============
Authentication API endpoints. All routes start with /api/auth
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

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/register', methods=['POST'])
def register():
    """ POST Register a new user.

    Parameters
    ------
    firstName: str
    lastName: str
    email: str
    password: str
    isTutor: bool

    Returns
    ------
    uid: int
        unique ID that idenfies this user.

    Raises
    ------
    BadRequest
        Some part of the required parameters is missing.
    UsersExists
        User with the same email has already registered.
    """
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json(force=True)
        fname = data['firstName']
        lname = data['lastName']
        email = data['email']
        password = data['password']
        isTutor = int(data['isTutor'])
        error = None

        if not fname:
            error = 'First Name is required.'
        elif not lname:
            error = 'Last Name is required.'
        elif not email:
            error = 'Email is required.'
        elif not password:
            error = 'Password is required.'

        else:
            for uid in redis_client.keys("user*"):
                if email == redis_client.hget(uid, 'email'):
                    error = 'Email {} is already registered.'.format(email)

        if error is None:
            next_uid = redis_client.get('next_uid')
            redis_client.incr('next_uid')
            redis_client.hmset("user{}".format(next_uid), {'fname': fname, 'lname': lname, 'email': email, 'password': generate_password_hash(password), 'isTutor': isTutor, 'uid': next_uid})
            redis_client.bgsave()
            return jsonResponse({'uid': next_uid})

        return errorResponse(error)
    return errorResponse('POST to this endpoint')

@bp.route('/login', methods=['POST'])
def login():
    """ POST login as a user.

    Parameters
    ------
    email: str
    password: str

    Returns
    ------
    uid: int
        unique ID that idenfies this user.

    Raises
    ------
    InvalidEmail
        Email does not exist in system.
    InvalidPassword
        Password does not exist in system.

    Notes
    -----
    This function also sets a encrypted session cookie which can only be
    decrypted server-side.

    See Also
    --------
    backend.auth.getuid : getuid from session cookie.
    """
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json(force=True)
        email = data['email']
        password = data['password']
        error = None
        user = None

        for uid in redis_client.keys("user*"):
            u = redis_client.hgetall(uid)
            if u is not None and 'email' in u.keys() and u['email'] == email:
                user = u
                break

        if user is None or 'uid' not in user.keys():
            error = 'Invalid email.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user['uid']

            return jsonResponse({'uid': user['uid']})

        return errorResponse(error)
    return errorResponse('POST to this endpoint')

@bp.route('/getuid', methods=['GET'])
def getuid():
    """ GET get currently logged in user from session cookie

    Notes
    -----
    Implicitly sends session cookie with request

    Returns
    -------
    uid: int
        Unique identification for user.
    """
    return jsonResponse({'uid': session.get('user_id')})

@bp.before_app_request
def _load_logged_in_user():
    redis_client = current_app.config['RDSCXN']
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = redis_client.hgetall(user_id)

@bp.route('/logout', methods=['GET'])
def logout():
    """ POST clear the current session cookie for a logged in user

    Notes
    -----
    Returns an empty session cookie, in addition to an empty payload. 
    """
    session.clear()
    return jsonResponse()

def _login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view
