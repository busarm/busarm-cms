#!/bin/bash

# Turn on bash's job control
set -m

echo "Installing npm packages"
cd /var/www
npm install --production
