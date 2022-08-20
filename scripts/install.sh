#!/bin/bash

# Turn on bash's job control
set -m

echo "Installing nodejs & npm"
sudo apt install nodejs npm

echo "Installing nginx"
sudo npm i -g pm2