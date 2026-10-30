import { NextResponse } from 'next/server';

// Cache singkat agar setiap request tidak selalu memanggil API
let maintenanceCache = { at: 0, enabled: false, message: '', siteName: '' };
const CACHE_TTL_MS = 30 * 1000;

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function getMaintenanceState() {
  const now = Date.now();
  if (now - maintenanceCache.at < CACHE_TTL_MS) return maintenanceCache;

  const fallback = { at: now, enabled: false, message: '', siteName: 'Pondok Pesantren Modern Darul Mukhlisin' };
  try {
    const base = (process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '').replace(/\/api$/, '');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`${base}/api/settings/site`, { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timer);
    const data = await res.json();
    const m = data?.data?.maintenance;
    maintenanceCache = {
      at: now,
      enabled: Boolean(m?.enabled),
      message: String(m?.message || 'Website sedang dalam pemeliharaan. Silakan kembali lagi beberapa saat lagi.'),
      siteName: String(data?.data?.identity?.siteName || fallback.siteName),
    };
  } catch {
    // Gagal mengambil status -> anggap tidak maintenance (fail-open agar situs tidak mati)
    maintenanceCache = fallback;
  }
  return maintenanceCache;
}

function maintenancePage(siteName, message) {
  const safeName = escapeHtml(siteName);
  const safeMessage = escapeHtml(message);
  const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Pemeliharaan — ${safeName}</title>
<style>
  body { margin: 0; font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; background: #f1f5f9; color: #1e293b; display: flex; min-height: 100vh; align-items: center; justify-content: center; padding: 24px; }
  .card { background: #fff; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,.08); padding: 48px 40px; max-width: 520px; text-align: center; }
  .icon { font-size: 56px; margin-bottom: 16px; }
  h1 { font-size: 24px; margin: 0 0 8px; }
  .name { color: #64748b; font-size: 14px; margin-bottom: 20px; }
  p { color: #475569; line-height: 1.6; }
</style>
</head>
<body>
  <div class="card">
    <div class="icon">🛠️</div>
    <h1>Sedang Dalam Pemeliharaan</h1>
    <div class="name">${safeName}</div>
    <p>${safeMessage}</p>
  </div>
</body>
</html>`;
  return new NextResponse(html, {
    status: 503,
    headers: { 'content-type': 'text/html; charset=utf-8', 'retry-after': '120' },
  });
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Protect admin routes from direct access without login cookie
  if (pathname.startsWith('/admin') && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Optional UX: if already logged in, skip login page
  if (pathname === '/login' && token) {
    const adminUrl = new URL('/admin', request.url);
    return NextResponse.redirect(adminUrl);
  }

  // Maintenance gate: hanya untuk route publik (bukan /admin, /login, /api, file statis)
  const isPublicRoute =
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/login') &&
    !pathname.startsWith('/api');
  if (isPublicRoute) {
    const state = await getMaintenanceState();
    if (state.enabled) {
      return maintenancePage(state.siteName, state.message);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|uploads|favicon.ico|robots.txt|sitemap.xml).*)'],
};
