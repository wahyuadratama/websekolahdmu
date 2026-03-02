'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import ImageUpload from '@/components/ImageUpload';
import { showSuccess, showError, showConfirm } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';
import { apiFetch } from '@/lib/fetcher';

export default function GaleriPage() {
  const [galeri, setGaleri] = useState([]);
  const [form, setForm] = useState({ judul: '', deskripsi: '', url: '' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGaleri();
  }, []);

  const loadGaleri = async () => {
    try {
      const data = await apiFetch(`${API_URL}/api/galeri`);
      setGaleri(data.data);
    } catch (error) {
      showError('Gagal memuat data galeri: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editId
        ? `${API_URL}/api/galeri/${editId}`
        : `${API_URL}/api/galeri`;

      const data = await apiFetch(url, {
        method: editId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (data.success) {
        await showSuccess(
          editId ? 'Galeri berhasil diupdate!' : 'Galeri berhasil ditambahkan!'
        );
        setForm({ judul: '', deskripsi: '', url: '' });
        setEditId(null);
        loadGaleri();
      } else {
        showError(data.message || 'Terjadi kesalahan');
      }
    } catch (error) {
      showError('Terjadi kesalahan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      judul: item.judul,
      deskripsi: item.deskripsi || '',
      url: item.url,
    });
    setEditId(item.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    const result = await showConfirm(
      'Foto akan dihapus permanen!',
      'Yakin ingin menghapus foto ini?'
    );

    if (result.isConfirmed) {
      try {
        const data = await apiFetch(`${API_URL}/api/galeri/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (data.success) {
          await showSuccess('Galeri berhasil dihapus!');
          loadGaleri();
        } else {
          showError(data.message || 'Gagal menghapus galeri');
        }
      } catch (error) {
        showError('Terjadi kesalahan: ' + error.message);
      }
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ judul: '', deskripsi: '', url: '' });
  };

  return (
    <AdminLayout title="Kelola Galeri">
      <div>
        {/* Form Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            {editId ? 'Edit Galeri' : 'Tambah Foto Galeri'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Judul <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                placeholder="Masukkan judul foto"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Deskripsi</label>
              <input
                type="text"
                value={form.deskripsi}
                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                placeholder="Deskripsi foto (opsional)"
              />
            </div>
            <div>
              <ImageUpload
                label="Foto Galeri *"
                value={form.url}
                onChange={(url) => setForm({ ...form, url })}
              />
            </div>
            <div className="sticky bottom-2 z-10 -mx-2 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-md backdrop-blur sm:mx-0">
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2 text-white hover:opacity-95 transition disabled:opacity-50"
                >
                  <i className="fas fa-save mr-2"></i>
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                  >
                    <i className="fas fa-times mr-2"></i>Batal
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Gallery Grid */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Daftar Galeri ({galeri.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galeri.length === 0 ? (
              <p className="col-span-4 text-center py-4 text-gray-600">Belum ada foto</p>
            ) : (
              galeri.map((item) => (
                <div key={item.id} className="relative group">
                  <Image
                    src={`${API_URL}${item.url}`}
                    alt={item.judul}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-500 text-white px-3 py-2 rounded"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded"
                        title="Hapus"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-semibold">{item.judul}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}



