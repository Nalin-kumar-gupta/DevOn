#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

postgres_ready() {
python << END
import sys
import psycopg2

try:
    print("Attempting to connect to the database...")
    conn = psycopg2.connect(
        dbname="drf_hub",
        user="timescale",
        password="catsaysmeow",
        host="db",
        port="5432",
    )
    print("Successfully connected to the database.")
except psycopg2.OperationalError as e:
    print("Failed to connect to the database:", str(e))
    sys.exit(-1)
finally:
    try:
        conn.close()
    except:
        pass
sys.exit(0)

END
}

until postgres_ready; do
  >&2 echo 'Waiting for PostgreSQL to become available...'
  sleep 1
done
>&2 echo 'PostgreSQL is available'

# Debug: Echoing to check the execution command
echo "Executing command: $@"
exec "$@"