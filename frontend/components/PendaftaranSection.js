'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { API_BASE } from '@/lib/config';

export default function PendaftaranSection() {
  const [pendaftar, setPendaftar] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/pendaftaran/count`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPendaftar(data.data.count);
        }
      })
      .catch(err => console.error('Error:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      nama: e.target.nama.value,
      nisn: e.target.nisn.value,
      tempat_lahir: e.target.tempat_lahir.value,
      tanggal_lahir: e.target.tanggal_lahir.value,
      jenis_kelamin: e.target.jenis_kelamin.value,
      asal_sekolah: e.target.asal_sekolah.value,
      alamat: e.target.alamat.value,
      nama_ortu: e.target.nama_ortu.value,
      telepon: e.target.telepon.value,
      email: e.target.email.value || '',
    };

    try {
      const response = await fetch(`${API_BASE}/pendaftaran`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Pendaftaran berhasil! No. Pendaftaran: ${data.data.noPendaftaran}`);
        e.target.reset();
        setPendaftar(prev => prev + 1);
      } else {
        alert('Pendaftaran gagal: ' + data.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pendaftaran" className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 px-4 py-2 rounded-full mb-4">
            <span className="font-bold text-sm text-blue-600 inline-flex items-center gap-2">
              <Image src="https://img.icons8.com/ios-filled/24/3b82f6/edit.png" alt="Pendaftaran" width={16} height={16} className="w-4 h-4" />
              PENDAFTARAN DIBUKA
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Pendaftaran Siswa Baru
          </h2>
          <p className="text-xl text-gray-600">Tahun Ajaran 2026/2027</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Side - Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Kuota Card */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Kuota Terbatas</h3>
                    <p className="text-green-100 text-sm">Segera daftarkan!</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl text-center">
                  <p className="text-sm mb-2 opacity-90">Pendaftar Saat Ini</p>
                  <p className="text-5xl font-bold mb-2">{pendaftar}</p>
                  <p className="text-sm opacity-90">dari 100 kuota tersedia</p>
                  <div className="mt-4 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(pendaftar / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Keuntungan */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-check-circle text-blue-500"></i>
                  Keuntungan Mendaftar
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <i className="fas fa-star text-yellow-500 mt-1"></i>
                    <span className="text-gray-700">Bebas biaya pendaftaran</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-star text-yellow-500 mt-1"></i>
                    <span className="text-gray-700">Tes masuk gratis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-star text-yellow-500 mt-1"></i>
                    <span className="text-gray-700">Beasiswa prestasi tersedia</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-star text-yellow-500 mt-1"></i>
                    <span className="text-gray-700">Fasilitas lengkap & modern</span>
                  </li>
                </ul>
              </div>

              {/* Kontak */}
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg">
                <h4 className="text-lg font-bold mb-4">Butuh Bantuan?</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-phone"></i>
                    <span>(+62) 878-2527-9426</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-envelope"></i>
                    <span>info@darulmukhlisin.sch.id</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-clock"></i>
                    <span>Senin - Jumat: 07.00 - 16.00 WIB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-edit text-blue-600"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Form Pendaftaran</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium text-sm">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nama"
                        required
                        placeholder="Masukkan nama lengkap"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium text-sm">
                        NISN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nisn"
                        required
                        placeholder="Nomor Induk Siswa Nasional"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium text-sm">
                        Tempat Lahir <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="tempat_lahir"
                        required
                        placeholder="Kota/Kabupaten"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium text-sm">
                        Tanggal Lahir <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="tanggal_lahir"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium text-sm">
                        Jenis Kelamin <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="jenis_kelamin"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Pilih jenis kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium text-sm">
                        Asal Sekolah <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="asal_sekolah"
                        required
                        placeholder="Nama sekolah asal"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Alamat Lengkap <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="alamat"
                      rows="3"
                      required
                      placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium text-sm">
                        Nama Orang Tua/Wali <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nama_ortu"
                        required
                        placeholder="Nama lengkap orang tua"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium text-sm">
                        No. Telepon/WA <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="telepon"
                        required
                        placeholder="08xxxxxxxxxx"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Email (Opsional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>Mengirim Data...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2"></i>Daftar Sekarang
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
