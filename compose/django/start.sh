#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

echo "Changing to the Django project directory..."
echo "Current directory: $(pwd)"
echo "ls: $(ls)"
# cd /app/services
echo "Current directory: $(pwd)"


# Remove quotes from all relevant environment variables
export DJANGO_SECRET_KEY=$(echo $DJANGO_SECRET_KEY | sed 's/"//g')
export DEBUG=$(echo $DEBUG | sed 's/"//g')
export DJANGO_ALLOWED_HOSTS=$(echo $DJANGO_ALLOWED_HOSTS | sed 's/"//g')

export POSTGRES_ENGINE=$(echo $POSTGRES_ENGINE | sed 's/"//g')
export POSTGRES_DB=$(echo $POSTGRES_DB | sed 's/"//g')
export POSTGRES_USER=$(echo $POSTGRES_USER | sed 's/"//g')
export POSTGRES_PASSWORD=$(echo $POSTGRES_PASSWORD | sed 's/"//g')
export POSTGRES_HOST=$(echo $POSTGRES_HOST | sed 's/"//g')
export POSTGRES_PORT=$(echo $POSTGRES_PORT | sed 's/"//g')
export DB_IGNORE_SSL=$(echo $DB_IGNORE_SSL | sed 's/"//g')

export REDIS_HOST=$(echo $REDIS_HOST | sed 's/"//g')
export REDIS_PORT=$(echo $REDIS_PORT | sed 's/"//g')
export REDIS_PASSWORD=$(echo $REDIS_PASSWORD | sed 's/"//g')
export REDIS_SSL_CERT_REQS=$(echo $REDIS_SSL_CERT_REQS | sed 's/"//g')

export CACHE_TTL=$(echo $CACHE_TTL | sed 's/"//g')

export CELERY_TIMEZONE=$(echo $CELERY_TIMEZONE | sed 's/"//g')

# function migrate() {
#     echo "Running database migrations..."
#     python manage.py migrate
#     result=$?
#     if [ $result -eq 0 ]; then
#         echo "Database migrations completed successfully."
#     else
#         echo "Database migration failed with status code: $result"
#         exit 1
#     fi
# }

# echo "Starting the migration process..."
# migrate

echo "Starting Django development server..."
python manage.py runserver 0.0.0.0:8000