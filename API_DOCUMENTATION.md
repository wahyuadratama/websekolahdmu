# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Or via httpOnly cookie (automatically set after login).

---

## Auth Endpoints

### POST /auth/login
Login to get JWT token.

**Request Body:**
```json
{
  "username": "superadmin",
  "password": "Super@dmin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "superadmin",
    "fullName": "Super Administrator",
    "email": "superadmin@darulmukhlisin.sch.id",
    "role": "superadmin"
  }
}
```

### POST /auth/logout
Logout and clear JWT cookie.

**Response:**
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

### GET /auth/me
Get current authenticated user. (Auth required)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "username": "superadmin",
    "fullName": "Super Administrator",
    "email": "superadmin@darulmukhlisin.sch.id",
    "role": "superadmin"
  }
}
```

### GET /auth/users
Get all users. (Admin+ required)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "username": "superadmin",
      "fullName": "Super Administrator",
      "email": "superadmin@darulmukhlisin.sch.id",
      "role": "superadmin",
      "status": "active",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /auth/register
Register new user. (Admin+ required)

**Request Body:**
```json
{
  "username": "newadmin",
  "password": "Admin@123",
  "fullName": "New Admin",
  "email": "admin@darulmukhlisin.sch.id",
  "role": "admin"
}
```

### DELETE /auth/users/:id
Delete user. (Superadmin only)

---

## Berita (News) Endpoints

### GET /berita
Get all berita with pagination.

**Query Parameters:**
- `status` (optional): "published" or "draft"
- `limit` (optional): Number of items (default: 100, max: 100)
- `skip` (optional): Number of items to skip (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "judul": "Penerimaan Santri Baru",
      "slug": "penerimaan-santri-baru",
      "kategori": "Pengumuman",
      "status": "published",
      "author": "Admin",
      "excerpt": "Pendaftaran santri baru telah dibuka",
      "konten": "<p>Konten berita...</p>",
      "gambar": "/uploads/image.jpg",
      "tags": ["pendaftaran", "santri"],
      "views": 100,
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "total": 10,
  "limit": 100,
  "skip": 0
}
```

### GET /berita/:id
Get berita by ID.

### GET /berita/slug/:slug
Get berita by slug.

### POST /berita
Create new berita. (Auth required)

**Request Body:**
```json
{
  "judul": "Judul Berita",
  "kategori": "Pengumuman",
  "status": "published",
  "author": "Admin",
  "excerpt": "Ringkasan berita",
  "konten": "<p>Konten berita lengkap</p>",
  "gambar": "/uploads/image.jpg",
  "tags": ["tag1", "tag2"]
}
```

### PUT /berita/:id
Update berita. (Auth required)

### DELETE /berita/:id
Delete berita. (Auth required)

---

## Galeri Endpoints

### GET /galeri
Get all galeri items.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "judul": "Gedung Utama",
      "deskripsi": "Gedung utama pesantren",
      "url": "/uploads/image.jpg",
      "kategori": "Fasilitas",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /galeri
Create galeri item. (Auth required)

**Request Body:**
```json
{
  "judul": "Judul Foto",
  "deskripsi": "Deskripsi foto",
  "url": "/uploads/image.jpg",
  "kategori": "Kegiatan"
}
```

### PUT /galeri/:id
Update galeri item. (Auth required)

### DELETE /galeri/:id
Delete galeri item. (Auth required)

---

## Guru Endpoints

### GET /guru
Get all active guru.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "nama": "Ustadz Ahmad Fauzi",
      "nip": "1234567890",
      "mapel": "Tahfidz Al-Quran",
      "pendidikan": "S1 Pendidikan Agama Islam",
      "foto": "https://ui-avatars.com/api/?name=Ahmad+Fauzi",
      "status": "aktif",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /guru
Create guru. (Auth required)

**Request Body:**
```json
{
  "nama": "Ustadz Ahmad Fauzi",
  "nip": "1234567890",
  "mapel": "Tahfidz Al-Quran",
  "pendidikan": "S1 Pendidikan Agama Islam",
  "foto": "/uploads/photo.jpg",
  "status": "aktif"
}
```

### PUT /guru/:id
Update guru. (Auth required)

### DELETE /guru/:id
Delete guru. (Auth required)

---

## Pesan (Messages) Endpoints

### GET /pesan
Get all messages. (Auth required)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "nama": "John Doe",
      "email": "john@example.com",
      "subjek": "Pertanyaan tentang pendaftaran",
      "pesan": "Saya ingin bertanya...",
      "status": "unread",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /pesan
Create message (public endpoint).

**Request Body:**
```json
{
  "nama": "John Doe",
  "email": "john@example.com",
  "subjek": "Pertanyaan",
  "pesan": "Isi pesan..."
}
```

### PUT /pesan/:id/read
Mark message as read. (Auth required)

### DELETE /pesan/:id
Delete message. (Auth required)

---

## Pendaftaran (Registration) Endpoints

### GET /pendaftaran
Get all registrations. (Auth required)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "noPendaftaran": "REG-20250101-12345",
      "nama": "Ahmad Zaki",
      "nisn": "1234567890",
      "tempat_lahir": "Jakarta",
      "tanggal_lahir": "2010-01-01",
      "jenis_kelamin": "Laki-laki",
      "asal_sekolah": "SMP Negeri 1",
      "alamat": "Jl. Contoh No. 123",
      "nama_ortu": "Bapak Ahmad",
      "telepon": "081234567890",
      "email": "ahmad@example.com",
      "status": "pending",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /pendaftaran
Create registration (public endpoint).

**Request Body:**
```json
{
  "nama": "Ahmad Zaki",
  "nisn": "1234567890",
  "tempat_lahir": "Jakarta",
  "tanggal_lahir": "2010-01-01",
  "jenis_kelamin": "Laki-laki",
  "asal_sekolah": "SMP Negeri 1",
  "alamat": "Jl. Contoh No. 123",
  "nama_ortu": "Bapak Ahmad",
  "telepon": "081234567890",
  "email": "ahmad@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pendaftaran berhasil",
  "data": {
    "noPendaftaran": "REG-20250101-12345"
  }
}
```

### GET /pendaftaran/count
Get total registration count.

---

## Settings Endpoints

### GET /settings/stats
Get statistics (public endpoint).

**Response:**
```json
{
  "success": true,
  "data": {
    "siswa": 1200,
    "guru": 85,
    "keahlian": 15,
    "prestasi": 50
  }
}
```

### PUT /settings/stats
Update statistics. (Auth required)

**Request Body:**
```json
{
  "siswa": 1250,
  "guru": 90,
  "keahlian": 16,
  "prestasi": 55
}
```

---

## Upload Endpoint

### POST /upload
Upload image file. (Auth required)

**Request:**
- Content-Type: multipart/form-data
- Field name: "image"
- Max file size: 5MB
- Allowed types: jpeg, jpg, png, gif, webp

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "path": "/uploads/1234567890-123456789.jpg",
  "filename": "1234567890-123456789.jpg"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": [
    {
      "field": "email",
      "message": "Format email tidak valid"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Token tidak ditemukan"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Akses ditolak. Role tidak sesuai."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Data tidak ditemukan"
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "message": "Terlalu banyak request, silakan coba lagi nanti",
  "retryAfter": 900
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Terjadi kesalahan server"
}
```

---

## Rate Limits

- **Login endpoint**: 5 requests per 15 minutes per IP
- **Upload endpoint**: 20 requests per hour per IP
- **General API**: 100 requests per 15 minutes per IP (production only)

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- All IDs menggunakan integer auto increment (MySQL)
- Pagination uses skip/limit pattern
- File uploads are stored in `/uploads` directory
- Images are served as static files from `/uploads` path
