#!/bin/bash

# Turn on bash's job control
set -m

echo "Sync db"
cd /var/www
npm run sync:prod:db