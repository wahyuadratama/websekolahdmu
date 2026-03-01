# Migrasi MongoDB Docker -> Native MySQL

## 1) Export data dari Mongo lama (server lama)
```bash
mongoexport --db dmu_pesantren --collection users --out users.json
mongoexport --db dmu_pesantren --collection berita --out berita.json
mongoexport --db dmu_pesantren --collection galeri --out galeri.json
mongoexport --db dmu_pesantren --collection guru --out guru.json
mongoexport --db dmu_pesantren --collection pesan --out pesan.json
mongoexport --db dmu_pesantren --collection pendaftaran --out pendaftaran.json
mongoexport --db dmu_pesantren --collection settings --out settings.json
```

## 2) Pindahkan file JSON ke backend/migration-data/
Nama file harus:
- users.json
- berita.json
- galeri.json
- guru.json
- pesan.json
- pendaftaran.json
- settings.json

## 3) Setup native
```bash
cp backend/.env.example backend/.env
# isi DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
npm run setup
```

## 4) Import data ke MySQL
```bash
npm --prefix backend run import:mongo-json
```

## 5) Jalankan service
```bash
npm --prefix backend run start
npm --prefix frontend run start
```

## Catatan
- Schema MySQL dibuat otomatis saat backend start pertama.
- Password user dari Mongo tetap dipakai (hash bcrypt tetap valid).
- `_id` Mongo tidak dipakai, semua tabel MySQL pakai `id` auto increment.
