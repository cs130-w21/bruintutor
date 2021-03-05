import csv, json, os

import flask
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
bp = Blueprint('match', __name__, url_prefix='/api/match')
from form_response import *

@bp.route('/tutorrespond', methods=['POST'])
def tutor_respond():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()

        if not data:
            error = 'Data Body Required'
            return errorResponse(error)

        studentID = data.get('student')
        tutorID = data.get('tutor')

        if not studentID or not tutorID:
            error = 'Include all required parameters: student, tutor'
            return errorResponse(error)

        if not redis_client.keys("user{}".format(tutorID)):
            error = 'Tutor with UID {} not found'.format(tutorID)
            return errorResponse(error)

        if not redis_client.keys("user{}".format(studentID)):
            error = 'Student with UID {} not found'.format(studentID)
            return errorResponse(error)

        redis_client.rpush('students{}'.format(tutorID), studentID)
        redis_client.delete("tutor{}".format(studentID))
        redis_client.rpush('tutor{}'.format(studentID), tutorID)

        return jsonResponse()

    return jsonResponse()

@bp.route('/getUserList', methods=['POST'])
def get_user_list():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        uid = data.get('uid')

        if not uid:
            return errorResponse('Please include User ID')

        tutorlist = redis_client.lrange('students{}'.format(uid), 0, -1)
        studentlist = redis_client.lrange('tutor{}'.format(uid), 0, -1)

        if not tutorlist and not studentlist:
            return jsonResponse([])

        if tutorlist:
            tutorlist = list(map(int, tutorlist))
            return jsonResponse(tutorlist)

        if studentlist:
            studentlist = list(map(int, studentlist))
            return jsonResponse(studentlist)

        return jsonResponse([])

    return jsonResponse([])



