#!/bin/sh
license-checker --json > credits.json &&
python3 wrangle_credits.py && rm credits.json
