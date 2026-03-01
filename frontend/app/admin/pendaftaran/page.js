'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { showError } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';

export default function PendaftaranPage() {
  const [pendaftaran, setPendaftaran] = useState([]);
  const [selectedPendaftaran, setSelectedPendaftaran] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadPendaftaran();
  }, []);

  const loadPendaftaran = async () => {
    try {
      const res = await fetch(`${API_URL}/api/pendaftaran`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) setPendaftaran(data.data);
    } catch (error) {
      showError('Gagal memuat data pendaftaran: ' + error.message);
    }
  };

  const filteredData = pendaftaran.filter((item) => {
    if (filter === 'all') return true;
    return item.jenis_kelamin === filter;
  });

  return (
    <AdminLayout title="Data Pendaftaran">
      <div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              Data Pendaftaran Santri Baru ({pendaftaran.length})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Semua ({pendaftaran.length})
              </button>
              <button
                onClick={() => setFilter('Laki-laki')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'Laki-laki'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Laki-laki ({pendaftaran.filter((p) => p.jenis_kelamin === 'Laki-laki').length})
              </button>
              <button
                onClick={() => setFilter('Perempuan')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'Perempuan'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Perempuan ({pendaftaran.filter((p) => p.jenis_kelamin === 'Perempuan').length})
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">No. Pendaftaran</th>
                  <th className="px-4 py-2 text-left">Nama</th>
                  <th className="px-4 py-2 text-left">NISN</th>
                  <th className="px-4 py-2 text-left">Jenis Kelamin</th>
                  <th className="px-4 py-2 text-left">Asal Sekolah</th>
                  <th className="px-4 py-2 text-left">Tanggal Daftar</th>
                  <th className="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-600">
                      {filter === 'all' ? 'Belum ada pendaftaran' : `Belum ada pendaftaran ${filter}`}
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-blue-600">
                        {item.noPendaftaran}
                      </td>
                      <td className="px-4 py-3">{item.nama}</td>
                      <td className="px-4 py-3">{item.nisn}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            item.jenis_kelamin === 'Laki-laki'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-pink-100 text-pink-800'
                          }`}
                        >
                          {item.jenis_kelamin}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.asal_sekolah}</td>
                      <td className="px-4 py-3">
                        {new Date(item.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedPendaftaran(item)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Lihat Detail"
                        >
                          <i className="fas fa-eye"></i> Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Detail Pendaftaran */}
        {selectedPendaftaran && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Detail Pendaftaran</h3>
                <button
                  onClick={() => setSelectedPendaftaran(null)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
                  <div>
                    <label className="font-semibold text-gray-700">No. Pendaftaran:</label>
                    <p className="text-lg font-bold text-blue-600">
                      {selectedPendaftaran.noPendaftaran}
                    </p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700">Tanggal Daftar:</label>
                    <p>
                      {new Date(selectedPendaftaran.createdAt).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
                <hr />
                <h4 className="font-bold text-lg text-gray-800">Data Santri</h4>
                <div>
                  <label className="font-semibold text-gray-700">Nama Lengkap:</label>
                  <p className="text-lg">{selectedPendaftaran.nama}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-gray-700">NISN:</label>
                    <p>{selectedPendaftaran.nisn}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700">Jenis Kelamin:</label>
                    <p>{selectedPendaftaran.jenis_kelamin}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-gray-700">Tempat Lahir:</label>
                    <p>{selectedPendaftaran.tempat_lahir}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700">Tanggal Lahir:</label>
                    <p>
                      {new Date(selectedPendaftaran.tanggal_lahir).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Asal Sekolah:</label>
                  <p>{selectedPendaftaran.asal_sekolah}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Alamat:</label>
                  <p className="bg-gray-50 p-3 rounded">{selectedPendaftaran.alamat}</p>
                </div>
                <hr />
                <h4 className="font-bold text-lg text-gray-800">Data Orang Tua/Wali</h4>
                <div>
                  <label className="font-semibold text-gray-700">Nama Orang Tua/Wali:</label>
                  <p className="text-lg">{selectedPendaftaran.nama_ortu}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-gray-700">No. Telepon:</label>
                    <p>
                      <a
                        href={`tel:${selectedPendaftaran.telepon}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedPendaftaran.telepon}
                      </a>
                    </p>
                  </div>
                  {selectedPendaftaran.email && (
                    <div>
                      <label className="font-semibold text-gray-700">Email:</label>
                      <p>
                        <a
                          href={`mailto:${selectedPendaftaran.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {selectedPendaftaran.email}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 pt-4">
                  <a
                    href={`https://wa.me/${selectedPendaftaran.telepon.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    <i className="fab fa-whatsapp mr-2"></i>Hubungi via WhatsApp
                  </a>
                  <button
                    onClick={() => window.print()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    <i className="fas fa-print mr-2"></i>Cetak
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
