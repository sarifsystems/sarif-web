#!/usr/bin/env bash
set -eu

rm -rf dist || exit 0;

npm run build

cd dist
git init
git config user.name "Travis CI"
git config user.email "me+travis@cschomburg.com"

git add .
git commit -m "Deploy to GitHub Pages"

git push --force --quiet "https://${GH_TOKEN}@github.com/xconstruct/stark-web.git" master:gh-pages > /dev/null 2>&1
