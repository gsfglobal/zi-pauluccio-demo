#!/usr/bin/env bash
# Compila il sito per GitHub Pages e lo pubblica sul branch gh-pages.
set -euo pipefail
REPO_NAME="zi-pauluccio-demo"
rm -rf out
NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_BASE_PATH="/$REPO_NAME" NEXT_PUBLIC_SITE_URL="https://gsfglobal.github.io/$REPO_NAME" NEXT_PUBLIC_DEMO_MODE=true npx next build
touch out/.nojekyll
TMP=$(mktemp -d)
cp -r out/. "$TMP"
cd "$TMP"
git init -q -b gh-pages
git config user.name "gsfglobal"; git config user.email "gsfglobal@users.noreply.github.com"
git add -A
git commit -q -m "Pubblicazione sito demo"
git push -f "https://github.com/gsfglobal/$REPO_NAME" gh-pages
