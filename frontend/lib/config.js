// API Configuration
// NOTE: NEXT_PUBLIC_API_URL harus berupa origin (tanpa /api), contoh: https://darulmukhlisin.ponpes.id
const isServer = typeof window === 'undefined';

const rawApiUrl = isServer
  ? (process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000')
  : (process.env.NEXT_PUBLIC_API_URL || '');

const normalizeApiOrigin = (value = '') =>
  value
    .trim()
    .replace(/\/$/, '')
    .replace(/\/api$/, '');

const API_URL = normalizeApiOrigin(rawApiUrl);

export { API_URL };
export const API_BASE = API_URL ? `${API_URL}/api` : '/api';
export const UPLOADS_BASE = API_URL ? `${API_URL}/uploads` : '/uploads';
