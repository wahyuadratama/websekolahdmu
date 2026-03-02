'use client';

import { useState, useEffect, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { showError } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';

export default function PendaftaranPage() {
  const [pendaftaran, setPendaftaran] = useState([]);
  const [selectedPendaftaran, setSelectedPendaftaran] = useState(null);
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadPendaftaran();
  }, []);

  const loadPendaftaran = async () => {
    try {
      const res = await fetch(`${API_URL}/api/pendaftaran`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) setPendaftaran(data.data);
    } catch (error) {
      showError('Gagal memuat data pendaftaran: ' + error.message);
    }
  };

  const filteredData = useMemo(() => {
    return pendaftaran.filter((item) => {
      if (genderFilter !== 'all' && item.jenis_kelamin !== genderFilter) return false;
      if (statusFilter !== 'all' && (item.status || 'pending') !== statusFilter) return false;

      if (dateFrom) {
        const itemDate = new Date(item.createdAt);
        const from = new Date(`${dateFrom}T00:00:00`);
        if (itemDate < from) return false;
      }

      if (dateTo) {
        const itemDate = new Date(item.createdAt);
        const to = new Date(`${dateTo}T23:59:59`);
        if (itemDate > to) return false;
      }

      return true;
    });
  }, [pendaftaran, genderFilter, statusFilter, dateFrom, dateTo]);

  const summary = useMemo(() => {
    const total = filteredData.length;
    const laki = filteredData.filter((p) => p.jenis_kelamin === 'Laki-laki').length;
    const perempuan = filteredData.filter((p) => p.jenis_kelamin === 'Perempuan').length;
    const pending = filteredData.filter((p) => (p.status || 'pending') === 'pending').length;
    return { total, laki, perempuan, pending };
  }, [filteredData]);

  const mapExportRows = () =>
    filteredData.map((item) => ({
      'No Pendaftaran': item.noPendaftaran,
      Nama: item.nama,
      NISN: item.nisn,
      'Jenis Kelamin': item.jenis_kelamin,
      Status: item.status || 'pending',
      'Tempat Lahir': item.tempat_lahir,
      'Tanggal Lahir': new Date(item.tanggal_lahir).toLocaleDateString('id-ID'),
      'Asal Sekolah': item.asal_sekolah,
      Alamat: item.alamat,
      'Nama Orang Tua/Wali': item.nama_ortu,
      Telepon: item.telepon,
      Email: item.email || '-',
      'Tanggal Daftar': new Date(item.createdAt).toLocaleDateString('id-ID')
    }));

  const exportCsv = () => {
    try {
      if (!filteredData.length) return showError('Tidak ada data untuk diexport');
      const rows = mapExportRows();
      const headers = Object.keys(rows[0]);
      const escapeCsv = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
      const csv = [headers.map(escapeCsv).join(','), ...rows.map((r) => headers.map((h) => escapeCsv(r[h])).join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pendaftaran-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      showError('Gagal export CSV: ' + error.message);
    }
  };

  const exportExcel = async () => {
    try {
      if (!filteredData.length) return showError('Tidak ada data untuk diexport');
      setExporting(true);
      const XLSX = await import('xlsx');
      const rows = mapExportRows();
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Pendaftaran');
      XLSX.writeFile(workbook, `pendaftaran-${new Date().toISOString().slice(0, 10)}.xlsx`, { compression: true });
    } catch (error) {
      showError('Gagal export Excel: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  const exportPdf = async () => {
    try {
      if (!filteredData.length) return showError('Tidak ada data untuk diexport');
      setExporting(true);
      const { default: jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');

      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      doc.setFontSize(12);
      doc.text('Data Pendaftaran Santri Baru', 14, 12);
      doc.setFontSize(9);
      doc.text(`Tanggal export: ${new Date().toLocaleString('id-ID')}`, 14, 18);

      const body = filteredData.map((item, index) => [
        String(index + 1),
        item.noPendaftaran,
        item.nama,
        item.jenis_kelamin,
        item.status || 'pending',
        item.asal_sekolah,
        item.telepon,
        new Date(item.createdAt).toLocaleDateString('id-ID')
      ]);

      autoTable(doc, {
        startY: 22,
        head: [['No', 'No Pendaftaran', 'Nama', 'JK', 'Status', 'Asal Sekolah', 'Telepon', 'Tanggal Daftar']],
        body,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [37, 99, 235] },
        theme: 'grid'
      });

      doc.save(`pendaftaran-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      showError('Gagal export PDF: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <AdminLayout title="Data Pendaftaran">
      <div>
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-3"><p className="text-xs text-slate-500">Total</p><p className="text-xl font-bold text-slate-800">{summary.total}</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-3"><p className="text-xs text-slate-500">Laki-laki</p><p className="text-xl font-bold text-blue-700">{summary.laki}</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-3"><p className="text-xs text-slate-500">Perempuan</p><p className="text-xl font-bold text-pink-700">{summary.perempuan}</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-3"><p className="text-xs text-slate-500">Pending</p><p className="text-xl font-bold text-amber-700">{summary.pending}</p></div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="mb-4 flex flex-col gap-3">
            <h3 className="text-lg sm:text-xl font-bold">Data Pendaftaran Santri Baru ({filteredData.length})</h3>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
              <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="all">Semua Gender</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>

              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>

              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />

              <button onClick={() => { setGenderFilter('all'); setStatusFilter('all'); setDateFrom(''); setDateTo(''); }} className="rounded-lg bg-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-300">Reset Filter</button>
            </div>

            <div className="flex w-full flex-wrap gap-2">
              <button type="button" onClick={exportCsv} disabled={exporting} className="rounded-lg bg-slate-700 px-4 py-2 text-white transition hover:bg-slate-800 disabled:opacity-50"><i className="fas fa-file-csv mr-2"></i>Export CSV</button>
              <button type="button" onClick={exportExcel} disabled={exporting} className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700 disabled:opacity-50"><i className="fas fa-file-excel mr-2"></i>Export Excel</button>
              <button type="button" onClick={exportPdf} disabled={exporting} className="rounded-lg bg-rose-600 px-4 py-2 text-white transition hover:bg-rose-700 disabled:opacity-50"><i className="fas fa-file-pdf mr-2"></i>Export PDF</button>
            </div>
          </div>

          <div className="space-y-3 md:hidden">
            {filteredData.length === 0 ? (
              <div className="rounded-lg border border-slate-200 p-4 text-center text-sm text-gray-600">Belum ada data sesuai filter</div>
            ) : (
              filteredData.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-semibold text-blue-600">{item.noPendaftaran}</p>
                  <p className="mt-1 font-semibold text-slate-800">{item.nama}</p>
                  <p className="text-sm text-slate-500">NISN: {item.nisn}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.asal_sekolah}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs ${item.jenis_kelamin === 'Laki-laki' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>{item.jenis_kelamin}</span>
                    <button onClick={() => setSelectedPendaftaran(item)} className="text-sm font-medium text-blue-600 hover:text-blue-800" title="Lihat Detail"><i className="fas fa-eye mr-1"></i>Detail</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="-mx-4 hidden overflow-x-auto px-4 sm:mx-0 sm:px-0 md:block">
            <table className="w-full min-w-[760px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">No. Pendaftaran</th>
                  <th className="px-4 py-2 text-left">Nama</th>
                  <th className="px-4 py-2 text-left">NISN</th>
                  <th className="px-4 py-2 text-left">Jenis Kelamin</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Asal Sekolah</th>
                  <th className="px-4 py-2 text-left">Tanggal Daftar</th>
                  <th className="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr><td colSpan="8" className="text-center py-4 text-gray-600">Belum ada data sesuai filter</td></tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-blue-600">{item.noPendaftaran}</td>
                      <td className="px-4 py-3">{item.nama}</td>
                      <td className="px-4 py-3">{item.nisn}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-sm ${item.jenis_kelamin === 'Laki-laki' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>{item.jenis_kelamin}</span></td>
                      <td className="px-4 py-3">{item.status || 'pending'}</td>
                      <td className="px-4 py-3">{item.asal_sekolah}</td>
                      <td className="px-4 py-3">{new Date(item.createdAt).toLocaleDateString('id-ID')}</td>
                      <td className="px-4 py-3 text-center"><button onClick={() => setSelectedPendaftaran(item)} className="text-blue-600 hover:text-blue-800" title="Lihat Detail"><i className="fas fa-eye"></i> Detail</button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedPendaftaran && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg sm:text-xl font-bold">Detail Pendaftaran</h3>
                <button onClick={() => setSelectedPendaftaran(null)} className="text-gray-600 hover:text-gray-800"><i className="fas fa-times text-2xl"></i></button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
                  <div><label className="font-semibold text-gray-700">No. Pendaftaran:</label><p className="text-lg font-bold text-blue-600">{selectedPendaftaran.noPendaftaran}</p></div>
                  <div><label className="font-semibold text-gray-700">Tanggal Daftar:</label><p>{new Date(selectedPendaftaran.createdAt).toLocaleDateString('id-ID')}</p></div>
                </div>
                <hr />
                <h4 className="font-bold text-lg text-gray-800">Data Santri</h4>
                <div><label className="font-semibold text-gray-700">Nama Lengkap:</label><p className="text-lg">{selectedPendaftaran.nama}</p></div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><label className="font-semibold text-gray-700">NISN:</label><p>{selectedPendaftaran.nisn}</p></div>
                  <div><label className="font-semibold text-gray-700">Jenis Kelamin:</label><p>{selectedPendaftaran.jenis_kelamin}</p></div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><label className="font-semibold text-gray-700">Tempat Lahir:</label><p>{selectedPendaftaran.tempat_lahir}</p></div>
                  <div><label className="font-semibold text-gray-700">Tanggal Lahir:</label><p>{new Date(selectedPendaftaran.tanggal_lahir).toLocaleDateString('id-ID')}</p></div>
                </div>
                <div><label className="font-semibold text-gray-700">Asal Sekolah:</label><p>{selectedPendaftaran.asal_sekolah}</p></div>
                <div><label className="font-semibold text-gray-700">Alamat:</label><p className="bg-gray-50 p-3 rounded">{selectedPendaftaran.alamat}</p></div>
                <hr />
                <h4 className="font-bold text-lg text-gray-800">Data Orang Tua/Wali</h4>
                <div><label className="font-semibold text-gray-700">Nama Orang Tua/Wali:</label><p className="text-lg">{selectedPendaftaran.nama_ortu}</p></div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><label className="font-semibold text-gray-700">No. Telepon:</label><p><a href={`tel:${selectedPendaftaran.telepon}`} className="text-blue-600 hover:underline">{selectedPendaftaran.telepon}</a></p></div>
                  {selectedPendaftaran.email && (<div><label className="font-semibold text-gray-700">Email:</label><p><a href={`mailto:${selectedPendaftaran.email}`} className="text-blue-600 hover:underline">{selectedPendaftaran.email}</a></p></div>)}
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  <a href={`https://wa.me/${selectedPendaftaran.telepon.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"><i className="fab fa-whatsapp mr-2"></i>Hubungi via WhatsApp</a>
                  <button onClick={() => window.print()} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"><i className="fas fa-print mr-2"></i>Cetak</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
