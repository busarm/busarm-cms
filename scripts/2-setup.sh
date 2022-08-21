#!/bin/bash

# Turn on bash's job control
set -m

echo "Sync db"
npm run sync:prod:db