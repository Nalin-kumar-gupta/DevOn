#!/bin/bash

echo "Running migrations..."
python manage.py migrate


echo "Starting Gunicorn server..."
gunicorn PyEditorial.wsgi --bind 0.0.0.0:8000