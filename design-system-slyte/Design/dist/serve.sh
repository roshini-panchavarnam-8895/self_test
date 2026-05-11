#!/bin/bash
# Start a local HTTP server for the Design Library
# Usage: bash serve.sh [port]
PORT=${1:-8080}
echo "Starting Design Library server at http://localhost:$PORT"
echo "Press Ctrl+C to stop."
cd "$(dirname "$0")"
python3 -m http.server "$PORT"
