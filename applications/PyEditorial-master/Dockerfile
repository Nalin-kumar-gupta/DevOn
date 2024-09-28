FROM python:3.9

WORKDIR /app
COPY . .

# install requirements
RUN pip install -r requirements.txt

# migrations
RUN python manage.py makemigrations content
# static
RUN python manage.py collectstatic --noinput

CMD ["./prod_start.sh"]
