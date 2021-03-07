"""
match.py
==============
Endpoints for operations related to matching users. All routes start with
/api/match
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
import csv, json, os

import flask
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
bp = Blueprint('match', __name__, url_prefix='/api/match')
from form_response import *

@bp.route('/tutorrespond', methods=['POST'])
def tutor_respond():
    """ POST [for tutors] respond to an incoming connection request.
        Backend adds both members to each other's list.

        Parameters
        ----------
        studentID: int
            UID for the student
        tutorID: int
            UID of the tutor

        Notes
        -----
        returns an empty response body on success.


        Raises
        ------
        BadRequest
            Some part of the required parameters is missing.
    """
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
    """ POST get associated users of a given user.

        Parameters
        ----------
        uid: int
            UID for the interested user

        Returns
        -------
        userList: list[int]
            string list of uids associated with the requested user

        Raises
        ------
        BadRequest
            Some part of the required parameters is missing.
    """
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



