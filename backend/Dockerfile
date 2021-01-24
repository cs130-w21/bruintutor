FROM python:3.8-alpine

WORKDIR /usr/bin/app

COPY ./ ./

RUN set -e; \
	apk add --no-cache --virtual .build-deps \
		gcc \
		libc-dev \
		linux-headers \
	; \
	pip3 --no-cache-dir install -r requirements.txt; \
	apk del .build-deps;

CMD ["uwsgi", "app.ini"]