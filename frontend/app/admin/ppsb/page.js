'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { showError, showSuccess } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';

export default function AdminPpsbPage() {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [ppsb, setPpsb] = useState({
    biayaUjian: 'Rp150.000',
    timeline: [
      { tanggal: '1 November 2025', nama: 'Pembukaan Pendaftaran Santri Baru', status: 'Buka' },
      { tanggal: '8 Februari 2026', nama: 'Ujian Masuk Gelombang Pertama', status: 'Buka' },
      { tanggal: '7 Juni 2026', nama: 'Ujian Masuk Gelombang Kedua', status: 'Buka' },
      { tanggal: '12 Juli 2026', nama: 'Penutupan Pendaftaran', status: 'Segera' },
    ],
    biaya: {
      awalItems: [], awalTotal: 'Rp4.100.000',
      putraItems: [], putraTotal: 'Rp840.000',
      putriItems: [], putriTotal: 'Rp840.000',
      catatan: 'Catatan: Harga sewaktu-waktu dapat berubah.'
    }
  });
  const [initialPpsb, setInitialPpsb] = useState(null);

  useEffect(() => {
    loadPpsb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaults = {
    awalItems: [
      'Uang pangkal masuk KMI: Rp1.500.000',
      'Uang makan bulanan: Rp400.000',
      'Iuran sekolah dan asrama bulanan: Rp200.000',
      'Uang kesehatan (tahunan): Rp150.000',
      'Sewa almari (tahunan): Rp300.000',
      'Kasur: Rp550.000',
      'Kegiatan ekstrakurikuler (tahunan): Rp150.000',
      'Buku paket: Rp650.000',
      'Iuran Pramuka (tahunan): Rp100.000',
      'Iuran kertas (tahunan): Rp100.000',
    ],
    putraItems: ['Kaos olahraga: Rp200.000', 'Seragam Tapak Suci: Rp160.000', '3 kemeja: Rp480.000'],
    putriItems: ['Kaos olahraga: Rp220.000', 'Seragam Tapak Suci: Rp160.000', 'Jubah toska: Rp190.000', 'Jubah biru: Rp160.000', 'Jilbab putih & coklat: Rp110.000'],
  };

  const loadPpsb = async () => {
    try {
      setInitialLoading(true);
      const res = await fetch(`${API_URL}/api/settings/ppsb`);
      const data = await res.json();
      if (data.success && data.data) {
        const next = {
          biayaUjian: data.data.biayaUjian || 'Rp150.000',
          timeline: Array.isArray(data.data.timeline) && data.data.timeline.length ? data.data.timeline : ppsb.timeline,
          biaya: {
            awalItems: data.data?.biaya?.awalItems || defaults.awalItems,
            awalTotal: data.data?.biaya?.awalTotal || 'Rp4.100.000',
            putraItems: data.data?.biaya?.putraItems || defaults.putraItems,
            putraTotal: data.data?.biaya?.putraTotal || 'Rp840.000',
            putriItems: data.data?.biaya?.putriItems || defaults.putriItems,
            putriTotal: data.data?.biaya?.putriTotal || 'Rp840.000',
            catatan: data.data?.biaya?.catatan || 'Catatan: Harga sewaktu-waktu dapat berubah.',
          }
        };
        setPpsb(next);
        setInitialPpsb(next);
      }
    } catch (e) {
      showError('Gagal memuat pengaturan PPSB: ' + e.message);
    } finally {
      setInitialLoading(false);
    }
  };

  const updateTimelineItem = (idx, field, value) => {
    const next = [...ppsb.timeline];
    next[idx] = { ...next[idx], [field]: value };
    setPpsb({ ...ppsb, timeline: next });
  };

  const updateBiaya = (field, value) => {
    setPpsb({ ...ppsb, biaya: { ...ppsb.biaya, [field]: value } });
  };

  const isDirty = JSON.stringify(ppsb) !== JSON.stringify(initialPpsb);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...ppsb,
        biaya: {
          ...ppsb.biaya,
          awalItems: String(ppsb.biaya.awalItemsText || '').split('\n').map((x) => x.trim()).filter(Boolean),
          putraItems: String(ppsb.biaya.putraItemsText || '').split('\n').map((x) => x.trim()).filter(Boolean),
          putriItems: String(ppsb.biaya.putriItemsText || '').split('\n').map((x) => x.trim()).filter(Boolean),
        }
      };
      delete payload.biaya.awalItemsText;
      delete payload.biaya.putraItemsText;
      delete payload.biaya.putriItemsText;

      const res = await fetch(`${API_URL}/api/settings/ppsb`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setInitialPpsb(ppsb);
        await showSuccess('Pengaturan PPSB berhasil diupdate!');
      } else {
        showError(data.message || 'Gagal menyimpan pengaturan PPSB');
      }
    } catch (e) {
      showError('Terjadi kesalahan: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const biayaAwalText = (ppsb.biaya.awalItemsText ?? (ppsb.biaya.awalItems || []).join('\n'));
  const biayaPutraText = (ppsb.biaya.putraItemsText ?? (ppsb.biaya.putraItems || []).join('\n'));
  const biayaPutriText = (ppsb.biaya.putriItemsText ?? (ppsb.biaya.putriItems || []).join('\n'));

  return (
    <AdminLayout title="PPSB">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg sm:text-xl font-bold mb-4">Pengaturan PPSB</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {initialLoading && <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-sm text-blue-700">Memuat pengaturan PPSB...</div>}
          <fieldset disabled={loading || initialLoading} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Biaya Administrasi Ujian</label>
              <input type="text" value={ppsb.biayaUjian} onChange={(e) => setPpsb({ ...ppsb, biayaUjian: e.target.value })} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm" />
            </div>

            <div className="space-y-3">
              {ppsb.timeline.map((item, idx) => (
                <div key={idx} className="rounded-lg border border-slate-200 p-3 grid gap-3 md:grid-cols-3">
                  <input type="text" value={item.tanggal || ''} onChange={(e) => updateTimelineItem(idx, 'tanggal', e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Tanggal" />
                  <input type="text" value={item.nama || ''} onChange={(e) => updateTimelineItem(idx, 'nama', e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Nama tahapan" />
                  <select value={item.status || 'Buka'} onChange={(e) => updateTimelineItem(idx, 'status', e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    <option value="Buka">Buka</option><option value="Tutup">Tutup</option><option value="Segera">Segera</option>
                  </select>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Biaya Administrasi (Dinamis)</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Biaya Awal (1 baris 1 item)</label>
                  <textarea rows={8} value={biayaAwalText} onChange={(e)=>updateBiaya('awalItemsText', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input type="text" value={ppsb.biaya.awalTotal || ''} onChange={(e)=>updateBiaya('awalTotal', e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Total biaya awal"/>
                </div>
                <div>
                  <label className="text-sm font-medium">Seragam Putra (1 baris 1 item)</label>
                  <textarea rows={8} value={biayaPutraText} onChange={(e)=>updateBiaya('putraItemsText', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input type="text" value={ppsb.biaya.putraTotal || ''} onChange={(e)=>updateBiaya('putraTotal', e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Total seragam putra"/>
                </div>
                <div>
                  <label className="text-sm font-medium">Seragam Putri (1 baris 1 item)</label>
                  <textarea rows={8} value={biayaPutriText} onChange={(e)=>updateBiaya('putriItemsText', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                  <input type="text" value={ppsb.biaya.putriTotal || ''} onChange={(e)=>updateBiaya('putriTotal', e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Total seragam putri"/>
                </div>
              </div>
              <div className="mt-3">
                <label className="text-sm font-medium">Catatan Biaya</label>
                <input type="text" value={ppsb.biaya.catatan || ''} onChange={(e)=>updateBiaya('catatan', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={loading || !isDirty} className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2 text-white disabled:opacity-50">
                <i className="fas fa-save mr-2"></i>{loading ? 'Menyimpan...' : 'Simpan Pengaturan PPSB'}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </AdminLayout>
  );
}
