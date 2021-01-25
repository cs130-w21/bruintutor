# BruinTutor

[![Build Status](https://travis-ci.com/cs130-w21/bruintutor.svg?branch=master)](https://travis-ci.com/cs130-w21/bruintutor)
[![Release](https://img.shields.io/github/v/release/cs130-w21/bruintutor?label=release)](https://github.com/cs130-w21/bruintutor/releases/latest)

_"Walking among three people, I find my teacher among them. I choose that which is good in them and follow it, and that which is bad and change it.” \
-- Confucius_

## Docker configuration

All containers are accessible by their name:  
- `frontend` (ephemeral - exits after static file gen)
- `backend` (uwsgi instance)
- `redis`

**Exposed ports** are accessible from container to container. These are:
- `backend:5000` (uwsgi TCP port, used to forward nginx)
- `redis:6379` (redis DB port, used by backend to communicate with redis)

**Published ports** are accessible from host to container.  
`backend:80` is the only such port, which can be reached from `localhost:8080`

## Developing with Docker
*equivalents exist for Docker Desktop*

### Full Stack

After changes, rebuild the stack:  
`docker-compose build`

Start the full stack:  
`docker-compose up`

### Individual containers

Find a running container:  
`docker ps`

Kill a container:  
`docker kill <container_id>`

Get shell in running container:  
`docker exec -it <container ID> sh`

### Images

Find an image:  
`docker images`

Start shell in image, INSTEAD of regular entrypoint or CMD:  
`docker run -it <image ID> sh`

### Volumes

Find a data volume:  
`docker volume ls`

Drop shell in data volume (look at what's inside by creating a temporary busybox
container):  
`docker run -it --rm -v <vol_name>:/vol busybox sh`

### Flags

Bind LOCAL_PORT to CONTAINER_PORT (this can only be done when starting a
container):  
`-p LOCAL_PORT:CONTAINER_PORT`

Detach container and keep it running in background: `-d`

### Misc

Delete cached images:  
`docker system prune`

Create a local redis instance connectable from localhost:6379:
`docker run --rm -d -p 6379:6379 redis:alpine`
