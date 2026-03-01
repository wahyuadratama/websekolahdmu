// API Configuration
// Browser: pakai NEXT_PUBLIC_API_URL, fallback ke relative path (same-origin)
// Server-side (SSR): pakai INTERNAL_API_URL bila tersedia
const isServer = typeof window === 'undefined';

const API_URL = isServer
  ? (process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000')
  : (process.env.NEXT_PUBLIC_API_URL || '');

export { API_URL };
export const API_BASE = API_URL ? `${API_URL}/api` : '/api';
