'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { showSuccess, showError, showConfirm } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';
import { apiFetch } from '@/lib/fetcher';

const emptyForm = { pertanyaan: '', jawaban: '', urutan: 0, is_published: true };

export default function AdminFaqPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await apiFetch(`${API_URL}/api/faq/admin`, { credentials: 'include' });
      setItems(data.data);
    } catch (error) {
      showError('Gagal memuat data FAQ: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editId ? `${API_URL}/api/faq/${editId}` : `${API_URL}/api/faq`;
      const data = await apiFetch(url, {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...form, urutan: parseInt(form.urutan, 10) || 0 }),
      });
      if (data.success) {
        await showSuccess(editId ? 'FAQ berhasil diupdate!' : 'FAQ berhasil ditambahkan!');
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
      pertanyaan: item.pertanyaan,
      jawaban: item.jawaban || '',
      urutan: item.urutan ?? 0,
      is_published: item.isPublished !== false,
    });
    setEditId(item.id);
    window.scrollTo(0, 0);
  };

  const handleTogglePublish = async (item) => {
    try {
      const data = await apiFetch(`${API_URL}/api/faq/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...item, is_published: !item.isPublished }),
      });
      if (data.success) {
        await showSuccess(item.isPublished ? 'FAQ disembunyikan dari publik.' : 'FAQ dipublikasikan.');
        loadItems();
      } else {
        showError(data.message || 'Gagal mengubah status');
      }
    } catch (error) {
      showError('Terjadi kesalahan: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await showConfirm('Data akan dihapus permanen!', 'Yakin ingin menghapus FAQ ini?');
    if (result.isConfirmed) {
      try {
        const data = await apiFetch(`${API_URL}/api/faq/${id}`, { method: 'DELETE', credentials: 'include' });
        if (data.success) {
          await showSuccess('FAQ berhasil dihapus!');
          loadItems();
        } else {
          showError(data.message || 'Gagal menghapus FAQ');
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
    <AdminLayout title="Kelola FAQ">
      <div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4">{editId ? 'Edit FAQ' : 'Tambah FAQ'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Pertanyaan <span className="text-red-500">*</span></label>
              <input type="text" required value={form.pertanyaan} onChange={(e) => setForm({ ...form, pertanyaan: e.target.value })} className={inputCls} placeholder="Contoh: Apakah pendaftaran bisa dilakukan online?" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Jawaban <span className="text-red-500">*</span></label>
              <textarea rows={4} required value={form.jawaban} onChange={(e) => setForm({ ...form, jawaban: e.target.value })} className={inputCls} placeholder="Tulis jawaban yang jelas dan lengkap..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Urutan Tampil</label>
                <input type="number" min="0" value={form.urutan} onChange={(e) => setForm({ ...form, urutan: e.target.value })} className={inputCls} />
                <p className="text-xs text-slate-500 mt-1">Angka kecil tampil lebih dulu.</p>
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
          <h3 className="text-lg sm:text-xl font-bold mb-4">Daftar FAQ ({items.length})</h3>
          <div className="space-y-3">
            {items.length === 0 ? (
              <p className="text-center py-4 text-gray-600">Belum ada data FAQ</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border border-slate-200 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 grid place-items-center shrink-0">
                    <i className="fas fa-question text-slate-400"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-800 truncate">{item.pertanyaan}</p>
                    <p className="text-xs text-slate-500">Urutan: {item.urutan}</p>
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
