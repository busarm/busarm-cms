#!/bin/bash

# Turn on bash's job control
set -m

echo "Installing npm packages"
npm install --production
