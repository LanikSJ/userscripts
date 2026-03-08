#!/bin/bash

# Navigate to the script's directory
cd "$(dirname "$0")" || exit

# Define virtual environment directory
VENV_DIR="venv"

echo "Creating virtual environment..."
python3 -m venv "$VENV_DIR"

# Activate the virtual environment
# shellcheck source=/dev/null
source "$VENV_DIR/bin/activate"

echo "Installing dependencies from requirements.txt..."
if [ -f "../requirements.txt" ]; then
    pip install --upgrade pip
    pip install -r ../requirements.txt
else
    echo "requirements.txt not found!"
    deactivate
    rm -rf "$VENV_DIR"
    exit 1
fi

echo "Running domain_checker.py..."
python3 domain_checker.py "$@"

# Store exit code of the script
EXIT_CODE=$?

echo "Cleaning up..."
deactivate
rm -rf "$VENV_DIR"

echo "Done."
exit $EXIT_CODE
