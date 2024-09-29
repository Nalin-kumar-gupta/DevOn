#!/bin/bash

set -o errexit
set -o nounset

# Navigate to correct working directory if necessary
cd /app/services

# Remove stale celerybeat.pid file
rm -f './celerybeat.pid'

# Start Celery beat
celery -A drf_backend beat -l INFO