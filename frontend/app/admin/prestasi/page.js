'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import ImageUpload from '@/components/ImageUpload';
import { showSuccess, showError, showConfirm } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';
import { apiFetch } from '@/lib/fetcher';

const TINGKAT_OPTIONS = ['sekolah', 'kabupaten', 'provinsi', 'nasional', 'internasional'];

const emptyForm = { judul: '', deskripsi: '', tahun: '', tingkat: 'sekolah', foto: '', is_published: true };

export default function AdminPrestasiPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await apiFetch(`${API_URL}/api/prestasi/admin`, { credentials: 'include' });
      setItems(data.data);
    } catch (error) {
      showError('Gagal memuat data prestasi: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editId ? `${API_URL}/api/prestasi/${editId}` : `${API_URL}/api/prestasi`;
      const data = await apiFetch(url, {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (data.success) {
        await showSuccess(editId ? 'Prestasi berhasil diupdate!' : 'Prestasi berhasil ditambahkan!');
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
      judul: item.judul,
      deskripsi: item.deskripsi || '',
      tahun: item.tahun || '',
      tingkat: item.tingkat || 'sekolah',
      foto: item.foto || '',
      is_published: item.isPublished !== false,
    });
    setEditId(item.id);
    window.scrollTo(0, 0);
  };

  const handleTogglePublish = async (item) => {
    try {
      const data = await apiFetch(`${API_URL}/api/prestasi/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...item, is_published: !item.isPublished }),
      });
      if (data.success) {
        await showSuccess(item.isPublished ? 'Prestasi disembunyikan dari publik.' : 'Prestasi dipublikasikan.');
        loadItems();
      } else {
        showError(data.message || 'Gagal mengubah status');
      }
    } catch (error) {
      showError('Terjadi kesalahan: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await showConfirm('Data akan dihapus permanen!', 'Yakin ingin menghapus prestasi ini?');
    if (result.isConfirmed) {
      try {
        const data = await apiFetch(`${API_URL}/api/prestasi/${id}`, { method: 'DELETE', credentials: 'include' });
        if (data.success) {
          await showSuccess('Prestasi berhasil dihapus!');
          loadItems();
        } else {
          showError(data.message || 'Gagal menghapus prestasi');
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
    <AdminLayout title="Kelola Prestasi">
      <div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4">{editId ? 'Edit Prestasi' : 'Tambah Prestasi'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Judul Prestasi <span className="text-red-500">*</span></label>
              <input type="text" required value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className={inputCls} placeholder="Contoh: Juara 1 Tahfidz 5 Juz" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Deskripsi</label>
              <textarea rows={3} value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className={inputCls} placeholder="Keterangan prestasi (nama santri, lomba, penyelenggara...)" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Tahun</label>
                <input type="text" value={form.tahun} onChange={(e) => setForm({ ...form, tahun: e.target.value })} className={inputCls} placeholder="2026" maxLength={4} inputMode="numeric" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Tingkat</label>
                <select value={form.tingkat} onChange={(e) => setForm({ ...form, tingkat: e.target.value })} className={inputCls}>
                  {TINGKAT_OPTIONS.map((t) => (
                    <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <ImageUpload label="Foto Prestasi" value={form.foto} onChange={(url) => setForm({ ...form, foto: url })} />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="w-5 h-5 rounded accent-cyan-600" />
                <span className="text-gray-700 font-semibold text-sm">Tampilkan di website</span>
              </label>
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
          <h3 className="text-lg sm:text-xl font-bold mb-4">Daftar Prestasi ({items.length})</h3>
          <div className="space-y-3">
            {items.length === 0 ? (
              <p className="text-center py-4 text-gray-600">Belum ada data prestasi</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border border-slate-200 rounded-xl p-3">
                  {item.foto ? (
                    <Image src={`${API_URL}${item.foto}`} alt={item.judul} width={80} height={60} className="w-20 h-14 object-cover rounded-lg shrink-0" />
                  ) : (
                    <div className="w-20 h-14 rounded-lg bg-slate-100 grid place-items-center shrink-0">
                      <i className="fas fa-trophy text-slate-400"></i>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-800 truncate">{item.judul}</p>
                    <p className="text-xs text-slate-500 capitalize">{item.tingkat}{item.tahun ? ` • ${item.tahun}` : ''}</p>
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
