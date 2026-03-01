'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { showSuccess, showError, showConfirm } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';

export default function PesanPage() {
  const [pesan, setPesan] = useState([]);
  const [selectedPesan, setSelectedPesan] = useState(null);

  useEffect(() => {
    loadPesan();
  }, []);

  const loadPesan = async () => {
    try {
      const res = await fetch(`${API_URL}/api/pesan`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) setPesan(data.data);
    } catch (error) {
      showError('Gagal memuat data pesan: ' + error.message);
    }
  };

  const handleView = async (item) => {
    setSelectedPesan(item);

    if (item.status === 'unread') {
      try {
        await fetch(`${API_URL}/api/pesan/${item.id}/read`, {
          method: 'PUT',
          credentials: 'include',
        });
        loadPesan();
      } catch (error) {
        console.error('Error marking as read:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await showConfirm(
      'Pesan akan dihapus permanen!',
      'Yakin ingin menghapus pesan ini?'
    );

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/api/pesan/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        const data = await res.json();
        if (data.success) {
          await showSuccess('Pesan berhasil dihapus!');
          setSelectedPesan(null);
          loadPesan();
        } else {
          showError(data.message || 'Gagal menghapus pesan');
        }
      } catch (error) {
        showError('Terjadi kesalahan: ' + error.message);
      }
    }
  };

  const unreadCount = pesan.filter((p) => p.status === 'unread').length;

  return (
    <AdminLayout title="Kelola Pesan">
      <div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              Pesan Masuk ({unreadCount} belum dibaca)
            </h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {unreadCount} Baru
              </span>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Nama</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Subjek</th>
                  <th className="px-4 py-2 text-left">Tanggal</th>
                  <th className="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pesan.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-600">
                      Belum ada pesan
                    </td>
                  </tr>
                ) : (
                  pesan.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-b hover:bg-gray-50 ${
                        item.status === 'unread' ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        {item.status === 'unread' && (
                          <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            Baru
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold">{item.nama}</td>
                      <td className="px-4 py-3">{item.email}</td>
                      <td className="px-4 py-3">{item.subjek}</td>
                      <td className="px-4 py-3">
                        {new Date(item.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() => handleView(item)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Lihat Detail"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Hapus"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Detail Pesan */}
        {selectedPesan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Detail Pesan</h3>
                <button
                  onClick={() => setSelectedPesan(null)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-gray-700">Dari:</label>
                  <p className="text-lg">{selectedPesan.nama}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Email:</label>
                  <p>
                    <a
                      href={`mailto:${selectedPesan.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedPesan.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Subjek:</label>
                  <p className="text-lg">{selectedPesan.subjek}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Pesan:</label>
                  <p className="whitespace-pre-wrap bg-gray-50 p-4 rounded mt-2">
                    {selectedPesan.pesan}
                  </p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Tanggal:</label>
                  <p>{new Date(selectedPesan.createdAt).toLocaleString('id-ID')}</p>
                </div>
                <div className="flex space-x-2 pt-4">
                  <a
                    href={`mailto:${selectedPesan.email}?subject=Re: ${selectedPesan.subjek}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    <i className="fas fa-reply mr-2"></i>Balas via Email
                  </a>
                  <button
                    onClick={() => handleDelete(selectedPesan.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    <i className="fas fa-trash mr-2"></i>Hapus
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
