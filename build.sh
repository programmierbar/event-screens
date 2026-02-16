#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="event-screens"
DIST_DIR="dist"

rm -rf "$DIST_DIR"

for slide in slides/*.md; do
  name=$(basename "$slide" .md)
  echo "Building $name..."
  ./node_modules/.bin/slidev build "$slide" --base "/$REPO_NAME/$name/" --out "../$DIST_DIR/$name"
done
