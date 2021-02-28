FROM alpine:3

WORKDIR /usr/bin/app

COPY ./ ./

RUN set -e; \
	apk add --no-cache -q --progress \
        python3 \
        uwsgi \
        uwsgi-python3 \
        exim \
	; \
    python3 -m ensurepip; \
    pip3 --no-cache-dir -q install wheel; \
	pip3 --no-cache-dir install -r requirements.txt; \
    echo "uid = $(id -u uwsgi)" >> app.ini;

CMD ["uwsgi", "app.ini"]
