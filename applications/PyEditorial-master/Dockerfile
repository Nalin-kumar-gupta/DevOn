FROM python:3.9

WORKDIR /app
COPY . .

# install requirements
RUN pip install -r requirements.txt

# migrations
RUN python manage.py makemigrations content
# static
RUN python manage.py collectstatic --noinput

# Strip Windows-style line endings (if needed)
RUN sed -i 's/\r$//g' ./prod_start.sh

# Make the script executable
RUN chmod +x ./prod_start.sh

# Execute the script as the container's entry point
CMD ["./prod_start.sh"]
