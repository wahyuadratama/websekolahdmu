#!/bin/bash
# deploy.sh — dijalankan oleh GitHub Actions (.github/workflows/deploy.yml)
# setiap ada push ke branch main, dan bisa juga dijalankan manual di VPS.
# Cara pakai: ./deploy.sh [branch]   (default: main)
set -e

BRANCH="${1:-main}"
APP_DIR="/home/zaenal/srv/websekolahdmu"
export PATH="/home/zaenal/.nvm/versions/node/v24.14.0/bin:$PATH"

cd "$APP_DIR"
echo "=== Deploy $BRANCH @ $(date '+%F %T') ==="

# 1. Amankan perubahan lokal (kalau ada) supaya git pull/reset tidak gagal
if [ -n "$(git status --porcelain)" ]; then
  echo "--- menyimpan perubahan lokal ke stash ---"
  git stash push --include-untracked -m "autostash-before-deploy $(date '+%F_%T')"
fi

# 2. Update kode ke versi terbaru dari GitHub
git fetch origin
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"
echo "--- kode: $(git log --oneline -1) ---"

# 3. Kembalikan perubahan lokal (gagal = konflik, deploy berhenti sebelum restart)
if git stash list | grep -q "autostash-before-deploy"; then
  echo "--- mengembalikan perubahan lokal ---"
  git stash pop
fi

# 4. Install dependency & build frontend
echo "--- npm install backend ---"
cd "$APP_DIR/backend" && npm install --no-audit --no-fund
echo "--- npm install + build frontend ---"
cd "$APP_DIR/frontend" && npm install --no-audit --no-fund && npm run build

# 5. Restart service
echo "--- restart pm2 ---"
pm2 restart websekolahdmu-backend websekolahdmu-frontend

echo "=== Deploy selesai ==="
