from flask import Flask
from flask_restful import Resource, Api
import sys
import os
import json
from flask import app,Flask, request
from flask_restful import Resource, Api, reqparse
import redis

app = Flask(__name__)

@app.route('/cart')
def shopping_cart():
    r = redis.Redis(host='redis', port=6379, db=0)
    if r.ping():
        message = "Redis OK "
    else:
        message = "Redis ping failed"
    return json.dumps({"Message":"ok: {}".format(message)})

if __name__ == "__main__":
    app.run(host="0.0.0.0")