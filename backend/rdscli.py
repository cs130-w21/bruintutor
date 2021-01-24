import redis

r = None

def connect(host='localhost', port=6379):
    global r
    r = redis.Redis(host=host, port=port, db=0, decode_responses=True)
