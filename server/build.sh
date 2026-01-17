#!/usr/bin/env bash
# exit on error
set -o errexit
pip install gunicorn
pip install -r requirements.txt

# Convert static files for Whitenoise
python manage.py collectstatic --no-input

# Run database migrations
python manage.py migrate