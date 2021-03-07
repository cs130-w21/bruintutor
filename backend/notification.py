"""
notification.py
===============
Endpoints for operations related to matching users. All routes start with
/api/notification
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
import functools
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
import flask
from werkzeug.security import check_password_hash, generate_password_hash

import json
import datetime
from form_response import *

bp = Blueprint('notification', __name__, url_prefix='/api/notification')

@bp.route('/add', methods=('GET', 'POST'))
def add():
    """ POST get currently pending notifications

        Parameters
        ----------
        uid: str
            UID to set the notification for
        notification: Notification
            Notification object (see notes)

        Returns
        -------
        notifications: list(Notification)

        Notes
        -----
        the Notification object is structure as the following:

        .. code-block::

            {
                msg: str
                notificationId: str
                createDate: timestamp
                read: bool
                type: "INITIATE" or "MESSAGE"
                from: str
                to: uid
            }

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
        uid = data['uid'] if 'uid' in data.keys() else None
        notification = data['notification'] if 'notification' in data.keys() else None
        if uid is None:
            error = 'uid is required.'
            return errorResponse(error)
        elif notification is None:
            error = 'bytes is required.'
            return errorResponse(error)
        for entry in ['msg', 'createdDate', 'read', 'type', 'from', 'to']:
            if entry not in notification.keys():
                error = '{} field in notification is required'.format(entry)
                return errorResponse(error)

        next_nid = redis_client.get('next_nid')
        redis_client.incr('next_nid')
        redis_client.hmset("notif{}".format(next_nid), {'from': notification['from'], 'to': notification['to'], 'msg': notification['msg'], 'createdDate': notification['createdDate'], 'type': notification['type'], 'read': 1 if notification['read'] else 0, 'notificationID': next_nid})
        redis_client.rpush("notifications{}".format(uid), next_nid)
        return jsonResponse()
    return jsonResponse()

@bp.route('/get', methods=('GET', 'POST'))
def get():
    """ POST get currently pending notifications

        Parameters
        ----------
        uid: str
            UID for the user requesting notifications

        Returns
        -------
        notifications: list(Notification)

        Notes
        -----
        the Notification objects returned by this endpoint each additionally
        contain a notificationId, which uniquely identifies them.

        See Also
        --------
        backend.notification.add: implementation of Notification
    """
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            error = 'Data Body Required'
            return errorResponse(error)
        uid = data['uid'] if 'uid' in data.keys() else None
        if uid is None:
            error = 'uid is required.'
            return errorResponse(error)

        nids = redis_client.lrange('notifications{}'.format(uid), 0, -1)
        notifs = []
        for nid in nids:
            notif = redis_client.hgetall("notif{}".format(nid))
            notif['read'] = notif['read'] == '1'
            notif['createdDate'] = int(notif['createdDate'])
            notifs.append(notif)

        return jsonResponse({'notification': notifs})
    return jsonResponse()

@bp.route('/delete', methods=('GET', 'POST'))
def delete():
    """ POST delete a given notification

        Parameters
        ----------
        uid: str
        notificationId: str

        Notes
        -----
        Method returns an empty object on success.

        See Also
        --------
        backend.notification.get: notificationId
    """
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            error = 'Data Body Required'
            return errorResponse(error)
        uid = data['uid'] if 'uid' in data.keys() else None
        notificationID = data['notificationID'] if 'notificationID' in data.keys() else None
        if uid is None:
            error = 'uid is required.'
            return errorResponse(error)
        if notificationID is None:
            error = 'notificationID is required.'
            return errorResponse(error)
        user_notifications = redis_client.lrange("notifications{}".format(uid), 0, -1)
        if notificationID not in user_notifications:
            error = 'User with UID {} does not have notification with ID {}'.format(uid, notificationID)
            return errorResponse(error)

        redis_client.lrem("notifications{}".format(uid), 0, notificationID)
        redis_client.delete("notif{}".format(notificationID))

        return jsonResponse()
    return jsonResponse()
