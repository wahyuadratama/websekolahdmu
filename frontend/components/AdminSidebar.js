'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { API_URL } from '@/lib/config';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include' });
        const data = await res.json();
        if (!cancelled && data?.success) setUser(data.data);
      } catch (e) {
        /* noop */
      }
    };

    loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = () => {
    fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' }).finally(() => {
      router.push('/login');
    });
  };

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
    <>
      <header className="bg-white shadow-lg p-4 flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#00b7b5' }}>Admin Panel</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{user?.nama || 'Admin'}</span>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </button>
        </div>
      </header>

      <div className="flex gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <nav className="space-y-2">
            {menuItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition ${
                  pathname === item.href
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <i className={`fas ${item.icon}`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
            <Link href="/" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition">
              <i className="fas fa-globe"></i>
              <span>Lihat Website</span>
            </Link>
          </nav>
        </div>
        <div className="flex-1">
          {/* Content will be here */}
        </div>
      </div>
    </>
  );
}
