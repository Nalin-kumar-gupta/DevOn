#!/bin/bash

set -o errexit
set -o nounset

# Ensure you're in the correct directory if necessary
cd /app/services

# Start Celery worker with watchfiles
watchfiles --filter python 'celery -A drf_backend worker --loglevel=info'