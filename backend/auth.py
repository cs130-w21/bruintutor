import functools
import flask
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
from werkzeug.security import check_password_hash, generate_password_hash
from form_response import jsonResponse, errorResponse

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# TODO: why specify GET?
@bp.route('/register', methods=('GET', 'POST'))
def register():
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

@bp.route('/login', methods=('GET', 'POST'))
def login():
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

# a way for the frontend to get uid of currently logged in user, if avail
@bp.route('/getuid')
def getuid():
    return jsonResponse({'uid': session.get('user_id')})

@bp.before_app_request
def load_logged_in_user():
    redis_client = current_app.config['RDSCXN']
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = redis_client.hgetall(user_id)

@bp.route('/logout')
def logout():
    session.clear()
    return jsonResponse()

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view
