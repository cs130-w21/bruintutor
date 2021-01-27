import functools
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
from werkzeug.security import check_password_hash, generate_password_hash

bp = Blueprint('profile', __name__, url_prefix='/api/profile')

@bp.route('/edit', methods=('GET', 'POST'))
def register():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        fname = request.form['fname']
        lname = request.form['lname']
        email = request.form['email']
        # TODO: store year and major
        year = request.form['year']
        major = request.form['major']

        password = request.form['password']
        isTutor = request.form['isTutor']
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
            for uid in redis_client.keys("uid*"):
                if email == redis_client.hget(uid, 'email'):
                    error = 'Email {} is already registered.'.format(email)

        if error is None:
            next_uid = redis_client.get('next_uid')
            redis_client.incr('next_uid')
            redis_client.hmset("uid{}".format(next_uid), {'fname': fname, 'lname': lname, 'email': email, 'password': generate_password_hash(password), 'isTutor': isTutor, 'uid': "uid{}".format(next_uid)})
            redis_client.bgsave()
            return redirect(url_for('auth.login'))

        flash(error)

    return '', 200
