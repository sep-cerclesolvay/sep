#!/bin/sh

BASE_DIR=$(dirname "$0")
FLAGS="--ignore=venv"

"$BASE_DIR/manage.py" makemessages -l fr $FLAGS && \
"$BASE_DIR/manage.py" compilemessages $FLAGS