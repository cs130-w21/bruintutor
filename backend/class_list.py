import csv
import os
import flask
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
bp = Blueprint('class_list', __name__, url_prefix='/api/classList')
from form_response import jsonResponse, errorResponse

@bp.route('/get', methods=('GET', 'POST'))
def class_list():
    response = None
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return errorResponse('Data Body Required')

        subjectArea = data.get('subjectArea')
        if not subjectArea:
            return errorResponse('Subject Area Required')

        this_folder = os.path.dirname(os.path.abspath(__file__))
        class_file = open(os.path.join(this_folder, 'resources/classes.csv'), mode='r')
        reader = csv.reader(class_file)

        classes = []
        for row in reader:
            if row[0] == subjectArea:
                classes.append(row[0] + ' ' + row[2])

        class_file.close()
        return jsonResponse({"classList": classes})
    return errorResponse('POST to this endpoint')

