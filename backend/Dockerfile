FROM alpine:3

WORKDIR /usr/bin/app

COPY ./ ./

RUN set -e; \
	apk add --no-cache --virtual .build-deps \
        uwsgi \
        uwsgi-python3 \
        python3 \
	; \
    python3 -m ensurepip; \
    pip3 --no-cache-dir install wheel; \
	pip3 --no-cache-dir install -r requirements.txt; \
	apk del .build-deps;

CMD ["uwsgi", "app.ini"]
