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
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            {editId ? 'Edit Data Guru' : 'Tambah Data Guru'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  placeholder="Nomor Induk Pegawai"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
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

        {/* List Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Daftar Guru ({guru.length})</h3>
          <div className="space-y-3 md:hidden">
            {guru.length === 0 ? (
              <div className="rounded-lg border border-slate-200 p-4 text-center text-sm text-gray-600">Belum ada data guru</div>
            ) : (
              guru.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-semibold text-slate-800">{item.nama}</p>
                  <p className="text-sm text-slate-500">NIP: {item.nip}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.mapel} • {item.pendidikan}</p>
                  <div className="mt-3 space-x-1 text-right">
                    <button onClick={() => handleEdit(item)} className="rounded-md px-2 py-1 text-blue-600 hover:bg-blue-50" title="Edit"><i className="fas fa-edit"></i></button>
                    <button onClick={() => handleDelete(item.id)} className="rounded-md px-2 py-1 text-red-600 hover:bg-red-50" title="Hapus"><i className="fas fa-trash"></i></button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="-mx-4 hidden overflow-x-auto px-4 sm:mx-0 sm:px-0 md:block">
            <table className="w-full min-w-[720px]">
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
                  <tr><td colSpan="5" className="text-center py-4 text-gray-600">Belum ada data guru</td></tr>
                ) : (
                  guru.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{item.nama}</td>
                      <td className="px-4 py-3">{item.nip}</td>
                      <td className="px-4 py-3">{item.mapel}</td>
                      <td className="px-4 py-3">{item.pendidikan}</td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800" title="Edit"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800" title="Hapus"><i className="fas fa-trash"></i></button>
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



