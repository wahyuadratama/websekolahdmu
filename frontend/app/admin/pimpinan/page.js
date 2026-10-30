'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import ImageUpload from '@/components/ImageUpload';
import { showSuccess, showError, showConfirm } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';
import { apiFetch } from '@/lib/fetcher';

const emptyForm = { nama: '', jabatan: '', foto: '', bio_singkat: '', urutan: 0, is_published: true };

export default function AdminPimpinanPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await apiFetch(`${API_URL}/api/pimpinan/admin`, { credentials: 'include' });
      setItems(data.data);
    } catch (error) {
      showError('Gagal memuat data pimpinan: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editId ? `${API_URL}/api/pimpinan/${editId}` : `${API_URL}/api/pimpinan`;
      const data = await apiFetch(url, {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...form, urutan: parseInt(form.urutan, 10) || 0 }),
      });
      if (data.success) {
        await showSuccess(editId ? 'Data pimpinan berhasil diupdate!' : 'Data pimpinan berhasil ditambahkan!');
        setForm(emptyForm);
        setEditId(null);
        loadItems();
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
      jabatan: item.jabatan,
      foto: item.foto || '',
      bio_singkat: item.bioSingkat || '',
      urutan: item.urutan ?? 0,
      is_published: item.isPublished !== false,
    });
    setEditId(item.id);
    window.scrollTo(0, 0);
  };

  const handleTogglePublish = async (item) => {
    try {
      const data = await apiFetch(`${API_URL}/api/pimpinan/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...item, is_published: !item.isPublished }),
      });
      if (data.success) {
        await showSuccess(item.isPublished ? 'Data disembunyikan dari publik.' : 'Data dipublikasikan.');
        loadItems();
      } else {
        showError(data.message || 'Gagal mengubah status');
      }
    } catch (error) {
      showError('Terjadi kesalahan: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await showConfirm('Data akan dihapus permanen!', 'Yakin ingin menghapus data ini?');
    if (result.isConfirmed) {
      try {
        const data = await apiFetch(`${API_URL}/api/pimpinan/${id}`, { method: 'DELETE', credentials: 'include' });
        if (data.success) {
          await showSuccess('Data pimpinan berhasil dihapus!');
          loadItems();
        } else {
          showError(data.message || 'Gagal menghapus data');
        }
      } catch (error) {
        showError('Terjadi kesalahan: ' + error.message);
      }
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(emptyForm);
  };

  const inputCls = 'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500';

  return (
    <AdminLayout title="Kelola Pimpinan">
      <div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4">{editId ? 'Edit Pimpinan' : 'Tambah Pimpinan'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Nama <span className="text-red-500">*</span></label>
                <input type="text" required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className={inputCls} placeholder="Nama lengkap" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Jabatan <span className="text-red-500">*</span></label>
                <input type="text" required value={form.jabatan} onChange={(e) => setForm({ ...form, jabatan: e.target.value })} className={inputCls} placeholder="Contoh: Pimpinan Pondok" />
              </div>
            </div>
            <div>
              <ImageUpload label="Foto" value={form.foto} onChange={(url) => setForm({ ...form, foto: url })} />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Bio Singkat</label>
              <textarea rows={3} value={form.bio_singkat} onChange={(e) => setForm({ ...form, bio_singkat: e.target.value })} className={inputCls} placeholder="Profil singkat (opsional)" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Urutan Tampil</label>
                <input type="number" min="0" value={form.urutan} onChange={(e) => setForm({ ...form, urutan: e.target.value })} className={inputCls} />
                <p className="text-xs text-slate-500 mt-1">Angka terkecil tampil paling atas = pimpinan utama.</p>
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="w-5 h-5 rounded accent-cyan-600" />
                  <span className="text-gray-700 font-semibold text-sm">Tampilkan di website</span>
                </label>
              </div>
            </div>
            <div className="sticky bottom-2 z-10 -mx-2 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-md backdrop-blur sm:mx-0">
              <div className="flex flex-wrap gap-3">
                <button type="submit" disabled={loading} className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2 text-white hover:opacity-95 transition disabled:opacity-50">
                  <i className="fas fa-save mr-2"></i>{loading ? 'Menyimpan...' : 'Simpan'}
                </button>
                {editId && (
                  <button type="button" onClick={handleCancel} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition">
                    <i className="fas fa-times mr-2"></i>Batal
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Daftar Pimpinan ({items.length})</h3>
          <div className="space-y-3">
            {items.length === 0 ? (
              <p className="text-center py-4 text-gray-600">Belum ada data pimpinan</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border border-slate-200 rounded-xl p-3">
                  {item.foto ? (
                    <Image src={`${API_URL}${item.foto}`} alt={item.nama} width={64} height={64} className="w-16 h-16 object-cover rounded-full shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-100 grid place-items-center shrink-0">
                      <i className="fas fa-user-tie text-slate-400 text-xl"></i>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-800 truncate">{item.nama}</p>
                    <p className="text-xs text-slate-500">{item.jabatan} • Urutan: {item.urutan}</p>
                  </div>
                  <button
                    onClick={() => handleTogglePublish(item)}
                    title={item.isPublished ? 'Sembunyikan dari publik' : 'Tampilkan ke publik'}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 ${item.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}
                  >
                    <i className={`fas ${item.isPublished ? 'fa-eye' : 'fa-eye-slash'} mr-1`}></i>
                    {item.isPublished ? 'Tampil' : 'Draft'}
                  </button>
                  <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-2 rounded-lg shrink-0" title="Edit">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-2 rounded-lg shrink-0" title="Hapus">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
