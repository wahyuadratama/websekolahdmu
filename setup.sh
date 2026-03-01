#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "[1/4] Install backend dependencies"
npm --prefix backend install

echo "[2/4] Install frontend dependencies"
npm --prefix frontend install

echo "[3/4] Build frontend"
npm --prefix frontend run build

echo "[4/4] Done"
echo "Run backend:  npm --prefix backend run start"
echo "Run frontend: npm --prefix frontend run start"
