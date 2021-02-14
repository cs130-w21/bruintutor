import csv, json, os

import flask
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
bp = Blueprint('class_list', __name__, url_prefix='/api/classList')

@bp.route('/get', methods=['GET'])
def class_list():
    response = None
    if request.method == 'GET':
        data = request.get_json()

        if not data:
            error = 'Data Body Required'
            resp_body_json = json.dumps({'error': True, 'errMsg': error})
            return flask.Response(status=200, content_type='application/json', response=resp_body_json)

        subjectArea = data.get('subjectArea')

        if not subjectArea:
            error = 'Subject Area Required'
            resp_body_json = json.dumps({'error': True, 'errMsg': error})
            return flask.Response(status=200, content_type='application/json', response=resp_body_json)
        else:
            this_folder = os.path.dirname(os.path.abspath(__file__))
            class_file = open(os.path.join(this_folder, 'resources/classes.csv'), mode='r')
            reader = csv.reader(class_file)

            classes = []
            for row in reader:
                if row[0] == subjectArea:
                    classes.append(row[0] + ' ' + row[2])

            class_file.close()
            resp_body = {"error": False, "errMsg": None, "payload": {"classList": classes}}
            resp_body_json = json.dumps(resp_body)
            return flask.Response(status=200, content_type='application/json', response=resp_body_json)

    return '', 200