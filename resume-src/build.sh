#!/bin/sh
# Builds assets/Madalitso-Phiri-Resume.pdf from resume-src/resume.html with headless Chrome.
# Run from anywhere: sh resume-src/build.sh
set -e
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=8766

python3 -m http.server "$PORT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER' EXIT
sleep 1

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="$PWD/assets/Madalitso-Phiri-Resume.pdf" \
  "http://localhost:$PORT/resume-src/resume.html" 2>/dev/null

echo "wrote assets/Madalitso-Phiri-Resume.pdf"
