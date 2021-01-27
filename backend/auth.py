import functools
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
from werkzeug.security import check_password_hash, generate_password_hash

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# TODO: why specify GET?
@bp.route('/signUp', methods=('GET', 'POST'))
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
            return redirect(url_for('auth.login'))

        flash(error)

    return '', 200

@bp.route('/login', methods=('GET', 'POST'))
def login():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json(force=True)
        email = data['email']
        password = data['password']
        # db = get_db()
        error = None
        # user = db.execute(
        #     'SELECT * FROM user WHERE username = ?', (username,)
        # ).fetchone()
        user = None
        for uid in redis_client.keys("user*"):
            u = redis_client.hgetall(uid)
            if u is not None and u['email'] == email:
                user = u
                break

        if user is None:
            error = 'Invalid email.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user['uid']
            return redirect(url_for('index'))

        flash(error)

    return '', 200

@bp.route('/forgot', methods=('GET', 'POST'))
def forgot():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json(force=True)
        email = data['email']

        error = None

        user = None
        for uid in redis_client.keys("uid*"):
            u = redis_client.hgetall(uid)
            if u['email'] == email:
                user = u
                break

        if user is None:
            error = 'Invalid email.'

        if error is None:
            # TODO: send forgot password email
            return redirect(url_for('auth.login'))

    return '', 200

@bp.route('/reset', methods=('GET', 'POST'))
def reset ():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json(force=True)
        email = data['password']

        error = None

        uid = None
        # TODO:  figure out user

        if uid is None:
            error = 'Invalid email.'

        if error is None:
            redis_client.hset(uid, 'password', password)
            return redirect(url_for('auth.login'))

    return '', 200

@bp.before_app_request
def load_logged_in_user():
    redis_client = current_app.config['RDSCXN']
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        # g.user = get_db().execute(
        #     'SELECT * FROM user WHERE id = ?', (user_id,)
        # ).fetchone()
        g.user = redis_client.hgetall(user_id)

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view
