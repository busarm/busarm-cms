#!/bin/bash

# Turn on bash's job control
set -m

echo "Installing nodejs - Download nvm installer"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

echo "Installing nodejs - Activate nvm installer"
. ~/.nvm/nvm.sh

echo "Installing nodejs - Install latest lts version"
nvm install --lts

echo "Installing pm2"
npm i -g pm2
