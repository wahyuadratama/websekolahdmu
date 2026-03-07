'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { API_URL } from '@/lib/config';
import { showError, showSuccess } from '@/lib/sweetalert';

const emptyItem = () => ({
  id: `tmn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  quote: '',
  name: '',
  role: '',
  source: '',
  year: '',
  isVerified: true,
  isPublished: true,
});

export default function AdminTestimoniPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/testimoni?all=1`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data?.data)) {
          setItems(data.data);
        }
      })
      .catch((err) => showError(`Gagal memuat testimoni: ${err.message}`))
      .finally(() => setLoading(false));
  }, []);

  const updateItem = (index, key, value) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  };

  const addItem = () => setItems((prev) => [emptyItem(), ...prev]);
  const removeItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(`${API_URL}/api/testimoni`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ items }),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) throw new Error(data?.message || 'Gagal menyimpan');
      showSuccess('Testimoni berhasil disimpan');
      setItems(data.data || []);
    } catch (err) {
      showError(err.message || 'Gagal menyimpan testimoni');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Kelola Testimoni">
      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Gunakan data testimoni dari sumber resmi (wali santri, santri, alumni) dan pastikan sudah verifikasi internal sebelum dipublish.
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <button onClick={addItem} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <i className="fas fa-plus mr-2" />Tambah Testimoni
        </button>
        <button onClick={handleSave} disabled={saving} className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-60">
          <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'} mr-2`} />Simpan
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-500">Memuat...</div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          Belum ada testimoni. Klik "Tambah Testimoni".
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id || index} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-semibold text-slate-800">Testimoni #{index + 1}</p>
                <button onClick={() => removeItem(index)} className="text-rose-600 hover:text-rose-700">
                  <i className="fas fa-trash" />
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <input value={item.name || ''} onChange={(e) => updateItem(index, 'name', e.target.value)} placeholder="Nama/Inisial" className="rounded-lg border px-3 py-2" />
                <input value={item.role || ''} onChange={(e) => updateItem(index, 'role', e.target.value)} placeholder="Peran (Wali Santri/Santri/Alumni)" className="rounded-lg border px-3 py-2" />
                <input value={item.source || ''} onChange={(e) => updateItem(index, 'source', e.target.value)} placeholder="Sumber (Wawancara/Forum/Survey)" className="rounded-lg border px-3 py-2" />
                <input value={item.year || ''} onChange={(e) => updateItem(index, 'year', e.target.value)} placeholder="Tahun" className="rounded-lg border px-3 py-2" />
              </div>

              <textarea value={item.quote || ''} onChange={(e) => updateItem(index, 'quote', e.target.value)} rows={3} placeholder="Isi testimoni" className="mt-3 w-full rounded-lg border px-3 py-2" />

              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={Boolean(item.isVerified)} onChange={(e) => updateItem(index, 'isVerified', e.target.checked)} />
                  Terverifikasi
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={item.isPublished !== false} onChange={(e) => updateItem(index, 'isPublished', e.target.checked)} />
                  Tampilkan di website
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
