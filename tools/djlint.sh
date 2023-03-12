#!/bin/bash

# This script can be used to format the Django HTML templates with djlint.

# Import utility functions
# shellcheck source=./tools/_functions.sh
source "$(dirname "${BASH_SOURCE[0]}")/_functions.sh"

require_installed

# Run djlint
echo "Starting code formatting with djlint..." | print_info
djlint --reformat --quiet --lint "${PACKAGE_DIR}"
echo "✔ Code formatting finished" | print_success

# Update translations (because changed formatting affects line numbers)
bash "${DEV_TOOL_DIR}/translate.sh"
