'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ImageUpload from '@/components/ImageUpload';
import { showSuccess, showError, showConfirm } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';

export default function GuruPage() {
  const [guru, setGuru] = useState([]);
  const [form, setForm] = useState({
    nama: '',
    nip: '',
    mapel: '',
    pendidikan: '',
    foto: '',
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGuru();
  }, []);

  const loadGuru = async () => {
    try {
      const res = await fetch(`${API_URL}/api/guru`);
      const data = await res.json();
      if (data.success) setGuru(data.data);
    } catch (error) {
      showError('Gagal memuat data guru: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editId
        ? `${API_URL}/api/guru/${editId}`
        : `${API_URL}/api/guru`;

      const res = await fetch(url, {
        method: editId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        await showSuccess(
          editId ? 'Data guru berhasil diupdate!' : 'Data guru berhasil ditambahkan!'
        );
        setForm({ nama: '', nip: '', mapel: '', pendidikan: '', foto: '' });
        setEditId(null);
        loadGuru();
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
      nama: item.nama,
      nip: item.nip,
      mapel: item.mapel,
      pendidikan: item.pendidikan,
      foto: item.foto || '',
    });
    setEditId(item.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    const result = await showConfirm(
      'Data guru akan dihapus permanen!',
      'Yakin ingin menghapus data guru ini?'
    );

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/api/guru/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        const data = await res.json();
        if (data.success) {
          await showSuccess('Data guru berhasil dihapus!');
          loadGuru();
        } else {
          showError(data.message || 'Gagal menghapus data guru');
        }
      } catch (error) {
        showError('Terjadi kesalahan: ' + error.message);
      }
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ nama: '', nip: '', mapel: '', pendidikan: '', foto: '' });
  };

  return (
    <AdminLayout title="Kelola Data Guru">
      <div>
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4">
            {editId ? 'Edit Data Guru' : 'Tambah Data Guru'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  NIP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.nip}
                  onChange={(e) => setForm({ ...form, nip: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nomor Induk Pegawai"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Jabatan/Mata Pelajaran <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.mapel}
                  onChange={(e) => setForm({ ...form, mapel: e.target.value })}
                  placeholder="Guru, Kepala Sekolah, dll"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Pendidikan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.pendidikan}
                  onChange={(e) => setForm({ ...form, pendidikan: e.target.value })}
                  placeholder="S1/S2/S3"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <ImageUpload
                label="Foto Guru (Opsional)"
                value={form.foto}
                onChange={(url) => setForm({ ...form, foto: url })}
              />
              <p className="text-sm text-gray-500 mt-1">
                Kosongkan untuk menggunakan avatar default
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
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
          </form>
        </div>

        {/* List Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Daftar Guru ({guru.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Nama</th>
                  <th className="px-4 py-2 text-left">NIP</th>
                  <th className="px-4 py-2 text-left">Jabatan</th>
                  <th className="px-4 py-2 text-left">Pendidikan</th>
                  <th className="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {guru.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-600">
                      Belum ada data guru
                    </td>
                  </tr>
                ) : (
                  guru.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{item.nama}</td>
                      <td className="px-4 py-3">{item.nip}</td>
                      <td className="px-4 py-3">{item.mapel}</td>
                      <td className="px-4 py-3">{item.pendidikan}</td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
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
      </div>
    </AdminLayout>
  );
}
