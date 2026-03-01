# Deployment Native (Tanpa Docker)

## 1. Requirement Server
- Ubuntu 22.04+
- Node.js 20+
- MySQL 8+
- Nginx
- PM2

## 2. Setup Project
```bash
git pull
npm run setup
cp backend/.env.example backend/.env
# edit backend/.env
```

## 3. Jalankan service via PM2
```bash
pm2 start "npm --prefix backend run start" --name dmu-backend
pm2 start "npm --prefix frontend run start" --name dmu-frontend
pm2 save
pm2 startup
```

## 4. Nginx reverse proxy (contoh)
```nginx
server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:5000/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /uploads/ {
    proxy_pass http://127.0.0.1:5000/uploads/;
    proxy_set_header Host $host;
  }
}
```

## 5. Restart service
```bash
pm2 restart dmu-backend dmu-frontend
pm2 logs dmu-backend --lines 100
```
