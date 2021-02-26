import csv, json, os

import flask
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
bp = Blueprint('match', __name__, url_prefix='/api/match')
from form_response import *

@bp.route('/initiate', methods=['POST'])
def initiate():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()

        if not data:
            error = 'Data Body Required'
            return errorResponse(error)

        studentID = data.get('student')
        tutorID = data.get('tutor')

        if not studentID or not tutorID:
            error = 'Student and Tutor parameters ID Required'
            return errorResponse(error)

        if not redis_client.keys('user{}'.format(tutorID)):
            error = 'Tutor with UID {} not found'.format(tutorID)
            return errorResponse(error)

        if not redis_client.keys('user{}'.format(studentID)):
            error = 'Student with UID {} not found'.format(studentID)
            return errorResponse(error)

        requests = redis_client.lrange('match_req{}'.format(tutorID), 0, -1)
        requests = (map(int, requests))
        students = redis_client.lrange('students{}'.format(tutorID), 0, -1)
        students = (map(int, students))
        if studentID in requests:
            error = "student already requested match"
            return errorResponse(error)
        elif studentID in students:
            error = "student is already matched with tutor"
            return errorResponse(error)
        else:
            redis_client.rpush('match_req{}'.format(tutorID), studentID)

        return jsonResponse()

    return jsonResponse()

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
        decision = data.get('requestDecision')

        if not studentID or not tutorID or not decision:
            error = 'Include all required parameters: student, tutor, requestDecision'
            return errorResponse(error)

        if not redis_client.keys("user{}".format(tutorID)):
            error = 'Tutor with UID {} not found'.format(tutorID)
            return errorResponse(error)

        if not redis_client.keys("user{}".format(studentID)):
            error = 'Student with UID {} not found'.format(studentID)
            return errorResponse(error)

        requests = redis_client.lrange('match_req{}'.format(tutorID), 0, -1)
        requests = (map(int, requests))
        if studentID not in requests:
            error = 'Student with UID {} has not sent a request'.format(studentID)
            return errorResponse(error)
        elif decision == 'yes':
            redis_client.rpush('students{}'.format(tutorID), studentID)
            redis_client.lrem('match_req{}'.format(tutorID), 1, studentID)
        elif decision == 'no':
            redis_client.lrem('match_req{}'.format(tutorID), 1, studentID)
        else:
            error = 'Decision must be a yes or no'
            errorResponse(error)

        return jsonResponse()

    return jsonResponse()

@bp.route('/tutorCheckRequest', methods=['GET'])
def tutor_check_request():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'GET':
        data = request.get_json()

        if not data:
            error = 'Data Body Required'
            return errorResponse(error)

        tutorID = data.get('tutor')

        if not tutorID:
            error = 'Student and Tutor ID parameters Required'
            return errorResponse(error)

        if not redis_client.keys("user{}".format(tutorID)):
            error = 'Tutor with UID {} not found'.format(tutorID)
            return errorResponse(error)

        if not redis_client.keys("match_req{}".format(tutorID)):
            return jsonResponse()

        requests = redis_client.lrange('match_req{}'.format(tutorID), 0, -1)
        return jsonResponse(requests)

    return jsonResponse()




@bp.route('/studentCheckResponse', methods=['GET'])
def student_check_response():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'GET':
        data = request.get_json()

        if not data:
            error = 'Data Body Required'
            return errorResponse(error)

        studentID = data.get('student')
        tutorID = data.get('tutor')

        if not studentID or not tutorID:
            error = 'Student and Tutor ID parameters Required'
            return errorResponse(error)

        if not redis_client.keys('user{}'.format(tutorID)):
            error = 'Tutor with UID {} not found'.format(tutorID)
            return errorResponse(error)

        if not redis_client.keys('user{}'.format(studentID)):
            error = 'Student with UID {} not found'.format(studentID)
            return errorResponse(error)

        requests = redis_client.lrange('match_req{}'.format(tutorID), 0, -1)
        requests = (map(int, requests))
        students = redis_client.lrange('students{}'.format(tutorID), 0, -1)
        students = (map(int, students))
        if studentID in students:
            return jsonResponse("yes")
        elif studentID in requests:
            return jsonResponse("pending")
        else:
            return jsonResponse("no")

    return jsonResponse()
