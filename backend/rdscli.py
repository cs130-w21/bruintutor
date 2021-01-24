import redis
import os

h = 'localhost'
if 'REDISHOST' in os.environ:
    h = os.environ['REDISHOST']

r = None

def connect(host=h, port=6379):
    global r
    r = redis.Redis(host=host, port=port, db=0, decode_responses=True)
