#!/bin/bash

# Turn on bash's job control
set -m

echo "Installing nodejs - Download installer"
curl -sL https://rpm.nodesource.com/setup_16.x | bash

echo "Installing nodejs - Install nodejs"
yum install -y nodejs

echo "Installing pm2"
npm i -g pm2
