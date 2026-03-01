import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import database from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '../../migration-data');

function readJson(name) {
  const p = path.join(dataDir, `${name}.json`);
  if (!fs.existsSync(p)) return [];
  const raw = fs.readFileSync(p, 'utf-8').trim();
  if (!raw) return [];
  if (raw.startsWith('[')) return JSON.parse(raw);
  return raw.split('\n').filter(Boolean).map((line) => JSON.parse(line));
}

const toDate = (v) => (v ? new Date(v) : null);

async function run() {
  await database.connect();

  const users = readJson('users');
  const berita = readJson('berita');
  const galeri = readJson('galeri');
  const guru = readJson('guru');
  const pesan = readJson('pesan');
  const pendaftaran = readJson('pendaftaran');
  const settings = readJson('settings');

  for (const u of users) {
    try {
      await database.query('INSERT INTO users (username,password,full_name,email,role,status,last_login,created_by,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)', [u.username, u.password, u.fullName || u.full_name || 'Unknown', u.email, u.role || 'staff', u.status || 'active', toDate(u.lastLogin || u.last_login), u.createdBy || 'system', toDate(u.createdAt || u.created_at) || new Date(), toDate(u.updatedAt || u.updated_at) || new Date()]);
    } catch (_) {}
  }

  for (const b of berita) {
    try {
      const slug = (b.slug || String(b.judul || '')).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await database.query('INSERT INTO berita (judul,slug,kategori,status,author,excerpt,konten,gambar,tags,views,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [b.judul, slug, b.kategori || 'Info', b.status || 'draft', b.author || 'Admin', b.excerpt || null, b.konten || '', b.gambar || '', JSON.stringify(b.tags || []), b.views || 0, toDate(b.createdAt || b.created_at) || new Date(), toDate(b.updatedAt || b.updated_at) || new Date()]);
    } catch (_) {}
  }

  for (const r of galeri) {
    try { await database.query('INSERT INTO galeri (judul,deskripsi,url,kategori,created_at,updated_at) VALUES (?,?,?,?,?,?)', [r.judul, r.deskripsi || null, r.url || '', r.kategori || 'Umum', toDate(r.createdAt || r.created_at) || new Date(), toDate(r.updatedAt || r.updated_at) || new Date()]); } catch (_) {}
  }

  for (const r of guru) {
    try { await database.query('INSERT INTO guru (nama,nip,mapel,pendidikan,foto,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)', [r.nama, r.nip, r.mapel, r.pendidikan || null, r.foto || '', r.status || 'aktif', toDate(r.createdAt || r.created_at) || new Date(), toDate(r.updatedAt || r.updated_at) || new Date()]); } catch (_) {}
  }

  for (const r of pesan) {
    try { await database.query('INSERT INTO pesan (nama,email,subjek,pesan,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?)', [r.nama, r.email, r.subjek, r.pesan, r.status || 'unread', toDate(r.createdAt || r.created_at) || new Date(), toDate(r.updatedAt || r.updated_at) || new Date()]); } catch (_) {}
  }

  for (const r of pendaftaran) {
    try {
      await database.query('INSERT INTO pendaftaran (no_pendaftaran,nama,nisn,tempat_lahir,tanggal_lahir,jenis_kelamin,asal_sekolah,alamat,nama_ortu,telepon,email,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [r.noPendaftaran || r.no_pendaftaran, r.nama, r.nisn, r.tempat_lahir, toDate(r.tanggal_lahir), r.jenis_kelamin, r.asal_sekolah, r.alamat, r.nama_ortu, r.telepon, r.email || null, r.status || 'pending', toDate(r.createdAt || r.created_at) || new Date(), toDate(r.updatedAt || r.updated_at) || new Date()]);
    } catch (_) {}
  }

  for (const r of settings) {
    try { await database.query('INSERT INTO settings (`key`, value_text, description) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE value_text=VALUES(value_text), description=VALUES(description)', [r.key, String(r.value ?? ''), r.description || '']); } catch (_) {}
  }

  console.log('✅ Import Mongo JSON -> MySQL selesai');
  await database.disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
