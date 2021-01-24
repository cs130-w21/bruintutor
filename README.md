# BruinMeet

[![Build Status](https://travis-ci.org/cs130-w21/bruintutor.svg?branch=master)](https://travis-ci.org/cs130-w21/bruintutor)
[![Release](https://img.shields.io/github/v/release/cs130-w21/bruintutor?label=release)](https://github.com/cs130-w21/bruintutor/releases/latest)

* “Walking among three people, I find my teacher among them. I choose that 
which is good in them and follow it, and that which is bad and change it.” 
-- Confucius *

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

Delete cached images
`docker system prune`
