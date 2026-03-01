# Web Sekolah DMU (Native + MySQL)

Stack:
- Frontend: Next.js
- Backend: Express
- Database: MySQL (native, tanpa Docker)

## Quick Start

```bash
# dari root project
npm run setup
```

### Konfigurasi backend

```bash
cp backend/.env.example backend/.env
# isi DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET
```

### Jalankan aplikasi

Terminal 1:
```bash
npm run start:backend
```

Terminal 2:
```bash
npm run start:frontend
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Deploy Native (VPS)

1. Install Node.js + MySQL
2. Clone/pull repo
3. `npm run setup`
4. Set env backend/frontend
5. Jalankan dengan PM2/systemd
6. Reverse proxy pakai Nginx

## Migrasi data Mongo lama ke MySQL
Lihat file: `MIGRATION_MYSQL.md`

## Catatan
- Schema MySQL dibuat otomatis saat backend start pertama.
- Default superadmin dibuat otomatis jika belum ada.
- Docker/compose sudah dihapus dari repo ini.
