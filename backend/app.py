import os
import auth, profile, class_list
from flask import Flask
import rdscli

rdscli.connect()
def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    rdscli.r.set('next_uid', 1)
    rdscli.r.set('next_pid', 1)
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

    return app

app = create_app()

if __name__ == '__main__':
    app.run()
