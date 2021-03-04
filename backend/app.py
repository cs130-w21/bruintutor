import os
# from flask_cors import CORS, cross_origin
import auth, profile, class_list, recovery, match, message, search, schedule
from flask import Flask
import rdscli

rdscli.connect()
def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # CORS(app, supports_credentials = True)
    if rdscli.r.get('next_uid') == None:
        rdscli.r.set('next_uid', 1)
    if rdscli.r.get('next_mid') == None:
        rdscli.r.set('next_mid', 1)
    if rdscli.r.get('next_nid') == None:
        rdscli.r.set('next_nid', 1)
    rdscli.r.bgsave()
    app.config.from_mapping(
        SECRET_KEY = 'dev',
        RDSCXN = rdscli.r,
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(auth.bp)
    app.register_blueprint(profile.bp)
    app.register_blueprint(class_list.bp)
    app.register_blueprint(message.bp)
    app.register_blueprint(recovery.bp)
    app.register_blueprint(match.bp)
    app.register_blueprint(schedule.bp)
    app.register_blueprint(search.bp)

    return app

app = create_app()

if __name__ == '__main__':
    app.run()
