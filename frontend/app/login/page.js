'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { colors } from '@/lib/designSystem';
import { showError, showLoading, closeLoading } from '@/lib/sweetalert';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    try {
      showLoading('Memproses login...');

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      let data = {};
      try {
        data = await response.json();
      } catch (_) {
        // ignore invalid JSON, handled below
      }

      closeLoading();

      if (response.ok && data.success) {
        router.replace('/admin');
      } else {
        showError(data.message || 'Login gagal. Periksa username dan password Anda.');
      }
    } catch (error) {
      closeLoading();
      showError('Terjadi kesalahan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/LOGO DMU.png"
            alt="Logo DMU"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600">Pondok Pesantren Modern Darul Mukhlisin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <i className="fas fa-user mr-2"></i>Username
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <i className="fas fa-lock mr-2"></i>Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            style={{ backgroundColor: colors.primary }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>Loading...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>Login
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="hover:underline font-semibold"
            style={{ color: colors.primary }}
          >
            <i className="fas fa-arrow-left mr-2"></i>Kembali ke Beranda
          </a>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center mb-2">
            <i className="fas fa-info-circle mr-2"></i>Default Login:
          </p>
          <p className="text-xs text-gray-500 text-center">
            Username: <strong>superadmin</strong> | Password: <strong>Super@dmin123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
