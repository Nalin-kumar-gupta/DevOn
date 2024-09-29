FROM python:3.11-slim-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV DJANGO_ENV=local

RUN apt-get update \
  && apt-get install -y build-essential \
  && apt-get install -y libpq-dev \
  && apt-get install -y gettext \
  && apt-get install -y git \
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

COPY ./base.txt /base.txt
RUN pip install -r /base.txt

COPY ./compose/django/entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//g' /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./compose/django/start.sh /start.sh
RUN sed -i 's/\r$//g' /start.sh
RUN chmod +x /start.sh

COPY ./compose/django/celery/worker/start.sh /start-worker.sh
RUN sed -i 's/\r$//g' /start-worker.sh
RUN chmod +x /start-worker.sh

COPY ./compose/django/celery/beat/start.sh /start-beat.sh
RUN sed -i 's/\r$//g' /start-beat.sh
RUN chmod +x /start-beat.sh

COPY . /app
WORKDIR /app/services

# # Run database migrations
# RUN python manage.py migrate --noinput

ENTRYPOINT ["/start.sh"]
