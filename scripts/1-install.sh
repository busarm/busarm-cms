#!/bin/bash

# Turn on bash's job control
set -m

# TODO Remove 
echo "Installing nodejs & npm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts

# TODO Remove
echo "Installing pm2"
npm i -g pm2

echo "Installing npm packages"
npm install --production
