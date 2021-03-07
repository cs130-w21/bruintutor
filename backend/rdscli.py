"""rdscli.py
helper module to connect to redis database.
"""
import redis
import os

h = 'localhost'
if 'REDISHOST' in os.environ:
    h = os.environ['REDISHOST']

r = None

def connect(host=h, port=6379):
    """ Connect to database. Each subsequent call connects to the database again.

    Parameters
    ----------
    host: str
        server location of redis
    port: int
        default 6379 port of redis

    Returns
    -------
    rdscli.r: Redis
        module-global Redis connection object
    """
    global r
    r = redis.Redis(host=host, port=port, db=0, decode_responses=True)
