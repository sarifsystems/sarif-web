#!/usr/bin/env bash
set -eu

npm run build

cd dist
git init
git config user.name "Travis CI"
git config user.email "me+travis@cschomburg.com"

git add .
git commit -m "Deploy to GitHub Pages"

git push --force --quiet "https://${GH_TOKEN}@github.com/sarifsystems/sarif-web.git" master:gh-pages > /dev/null 2>&1
