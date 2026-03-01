'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '@/lib/config';
import { apiFetch } from '@/lib/fetcher';

export default function AdminLayout({ children, title }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      try {
        const data = await apiFetch(`${API_URL}/api/auth/me`, {
          credentials: 'include',
        });

        if (!cancelled && data?.success) {
          setUser(data.data);
        } else if (!cancelled) {
          router.push('/login');
        }
      } catch {
        if (!cancelled) router.push('/login');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadUser();
    return () => { cancelled = true; };
  }, [router]);

  const handleLogout = () => {
    fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' }).finally(() => {
      router.push('/login');
    });
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-14 h-14 rounded-2xl bg-white shadow-md grid place-items-center">
          <i className="fas fa-spinner fa-spin text-2xl text-cyan-600"></i>
        </div>
      </div>
    );
  }

  const menuItems = [
    { href: '/admin', icon: 'fa-home', label: 'Dashboard' },
    { href: '/admin/berita', icon: 'fa-newspaper', label: 'Berita' },
    { href: '/admin/galeri', icon: 'fa-images', label: 'Galeri' },
    { href: '/admin/guru', icon: 'fa-chalkboard-teacher', label: 'Guru' },
    { href: '/admin/pesan', icon: 'fa-envelope', label: 'Pesan' },
    { href: '/admin/pendaftaran', icon: 'fa-user-plus', label: 'Pendaftaran' },
    { href: '/admin/settings', icon: 'fa-cog', label: 'Pengaturan' },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/45 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-slate-950 text-slate-100 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white grid place-items-center">
              <Image src="/images/LOGO DMU.png" alt="Logo" width={34} height={34} />
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold truncate">DMU Admin</h2>
              <p className="text-xs text-slate-400 truncate">Control Center</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <i className={`fas ${item.icon} w-5`}></i>
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition">
              <i className="fas fa-globe w-5"></i>
              <span className="font-medium">Lihat Website</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-cyan-500 text-white font-bold grid place-items-center shrink-0">
                {(user.fullName || user.nama || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{user.fullName || user.nama}</p>
                <p className="text-xs text-slate-400 truncate">{user.role || 'Admin'}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-rose-400 transition" title="Logout">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto w-full">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-10 h-10 rounded-lg hover:bg-slate-100 text-slate-700">
                <i className="fas fa-bars"></i>
              </button>
              <h1 className="text-xl lg:text-2xl font-semibold text-slate-800 tracking-tight">{title || 'Admin Panel'}</h1>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
