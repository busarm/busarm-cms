#!/bin/bash

# Turn on bash's job control
set -m

echo "Start pm2 app"
npm run stop:prod
npm run start:prod