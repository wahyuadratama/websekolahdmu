import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  constructor() {
    this.pool = null;
  }

  async connect() {
    const host = process.env.DB_HOST || '127.0.0.1';
    const port = Number(process.env.DB_PORT || 3306);
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || '';
    const database = process.env.DB_NAME || 'dmu_pesantren';

    const bootstrapPool = mysql.createPool({
      host,
      port,
      user,
      password,
      waitForConnections: true,
      connectionLimit: 2,
      queueLimit: 0,
      charset: 'utf8mb4'
    });

    await bootstrapPool.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await bootstrapPool.end();

    this.pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
      queueLimit: 0,
      charset: 'utf8mb4'
    });

    await this.pool.query('SELECT 1');
    await this.initializeSchema();
    console.log('✅ MySQL Connected');
    return this.pool;
  }

  async initializeSchema() {
    const sql = [
      `CREATE TABLE IF NOT EXISTS users (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(120) NOT NULL,
        email VARCHAR(120) NOT NULL UNIQUE,
        role ENUM('superadmin','admin','staff') NOT NULL DEFAULT 'staff',
        status ENUM('active','inactive') NOT NULL DEFAULT 'active',
        last_login DATETIME NULL,
        created_by VARCHAR(80) DEFAULT 'system',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
      `CREATE TABLE IF NOT EXISTS berita (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        judul VARCHAR(200) NOT NULL,
        slug VARCHAR(240) UNIQUE,
        kategori ENUM('Akademik','Prestasi','Kegiatan','Pengumuman','Info','Beasiswa') NOT NULL,
        status ENUM('published','draft') NOT NULL DEFAULT 'draft',
        author VARCHAR(120) NOT NULL DEFAULT 'Admin',
        excerpt TEXT NULL,
        konten LONGTEXT NOT NULL,
        gambar VARCHAR(255) NOT NULL DEFAULT '',
        tags JSON NULL,
        views INT NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_berita_status_created (status, created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
      `CREATE TABLE IF NOT EXISTS galeri (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        judul VARCHAR(180) NOT NULL,
        deskripsi TEXT NULL,
        url VARCHAR(255) NOT NULL,
        kategori VARCHAR(80) NOT NULL DEFAULT 'Umum',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
      `CREATE TABLE IF NOT EXISTS guru (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(160) NOT NULL,
        nip VARCHAR(50) NOT NULL UNIQUE,
        mapel VARCHAR(120) NOT NULL,
        pendidikan VARCHAR(140) NULL,
        foto VARCHAR(255) NOT NULL DEFAULT '',
        status ENUM('aktif','nonaktif') NOT NULL DEFAULT 'aktif',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
      `CREATE TABLE IF NOT EXISTS pesan (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(120) NOT NULL,
        email VARCHAR(120) NOT NULL,
        subjek VARCHAR(200) NOT NULL,
        pesan TEXT NOT NULL,
        status ENUM('unread','read') NOT NULL DEFAULT 'unread',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
      `CREATE TABLE IF NOT EXISTS pendaftaran (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        no_pendaftaran VARCHAR(30) NOT NULL UNIQUE,
        nama VARCHAR(120) NOT NULL,
        nisn VARCHAR(20) NOT NULL,
        tempat_lahir VARCHAR(120) NOT NULL,
        tanggal_lahir DATE NOT NULL,
        jenis_kelamin ENUM('Laki-laki','Perempuan') NOT NULL,
        asal_sekolah VARCHAR(160) NOT NULL,
        alamat TEXT NOT NULL,
        nama_ortu VARCHAR(120) NOT NULL,
        telepon VARCHAR(40) NOT NULL,
        email VARCHAR(120) NULL,
        status ENUM('pending','verified','rejected') NOT NULL DEFAULT 'pending',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_pendaftaran_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
      `CREATE TABLE IF NOT EXISTS settings (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        \`key\` VARCHAR(80) NOT NULL UNIQUE,
        value_text TEXT NOT NULL,
        description VARCHAR(255) NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    ];

    for (const s of sql) {
      await this.pool.query(s);
    }
  }

  async query(sql, params = []) {
    const [rows] = await this.pool.execute(sql, params);
    return rows;
  }

  getConnection() {
    return this.pool;
  }

  async disconnect() {
    if (this.pool) await this.pool.end();
  }
}

export default new Database();
