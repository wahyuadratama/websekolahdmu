'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import RichTextEditor from '@/components/RichTextEditor';
import ImageUpload from '@/components/ImageUpload';
import { showSuccess, showError, showConfirm } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';

export default function BeritaPage() {
  const [berita, setBerita] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [form, setForm] = useState({
    judul: '',
    kategori: 'Akademik',
    konten: '',
    excerpt: '',
    gambar: '',
    tags: '',
    status: 'published',
    author: '',
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBerita(page);
  }, [page]);

  const loadBerita = async (pageNumber = 1) => {
    try {
      const skip = (pageNumber - 1) * pageSize;
      const res = await fetch(`${API_URL}/api/berita?limit=${pageSize}&skip=${skip}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success) {
        setBerita(data.data);
        if (typeof data.total === 'number') setTotal(data.total);
      }
      else throw new Error(data.message || 'Gagal memuat data berita');
    } catch (error) {
      showError('Gagal memuat data berita: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation: basic length/required checks to avoid bad payloads
    if (!form.judul.trim()) {
      showError('Judul wajib diisi');
      setLoading(false);
      return;
    }
    if (!form.kategori.trim()) {
      showError('Kategori wajib diisi');
      setLoading(false);
      return;
    }
    if (!form.konten || form.konten.trim().length < 10) {
      showError('Konten minimal 10 karakter');
      setLoading(false);
      return;
    }
    if (form.judul.length > 150) {
      showError('Judul maksimal 150 karakter');
      setLoading(false);
      return;
    }
    if (form.excerpt && form.excerpt.length > 300) {
      showError('Excerpt maksimal 300 karakter');
      setLoading(false);
      return;
    }
    if (form.gambar && !form.gambar.startsWith('/') && !/^https?:\/\//i.test(form.gambar.trim())) {
      showError('URL gambar tidak valid');
      setLoading(false);
      return;
    }

    try {
      const url = editId
        ? `${API_URL}/api/berita/${editId}`
        : `${API_URL}/api/berita`;

      const payload = {
        ...form,
        tags: form.tags
          ? String(form.tags).split(',').map((t) => t.trim()).filter(Boolean)
          : [],
      };

      const res = await fetch(url, {
        method: editId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (_) {}

      if (!res.ok) {
        const detail = data?.errors?.map((e) => e.msg).join(', ');
        throw new Error(detail || data?.message || `HTTP ${res.status}`);
      }

      if (data.success) {
        await showSuccess(
          editId ? 'Berita berhasil diupdate!' : 'Berita berhasil ditambahkan!'
        );
        setForm({
          judul: '',
          kategori: 'Akademik',
          konten: '',
          excerpt: '',
          gambar: '',
          tags: '',
          status: 'published',
          author: '',
        });
        setEditId(null);
        loadBerita(page);
      } else {
        throw new Error(data.message || 'Terjadi kesalahan');
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
      kategori: item.kategori,
      konten: item.konten,
      excerpt: item.excerpt || '',
      gambar: item.gambar || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
      status: item.status || 'published',
      author: item.author || '',
    });
    setEditId(item.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    const result = await showConfirm(
      'Data berita akan dihapus permanen!',
      'Yakin ingin menghapus berita ini?'
    );

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/api/berita/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          if (data.success) {
          await showSuccess('Berita berhasil dihapus!');
          const remaining = (total - 1) - (page - 1) * pageSize;
          const nextPage = remaining <= 0 && page > 1 ? page - 1 : page;
          setPage(nextPage);
          loadBerita(nextPage);
        } else {
            throw new Error(data.message || 'Gagal menghapus berita');
        }
      } catch (error) {
        showError('Terjadi kesalahan: ' + error.message);
      }
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({
      judul: '',
      kategori: 'Akademik',
      konten: '',
      excerpt: '',
      gambar: '',
      tags: '',
      status: 'published',
      author: '',
    });
  };

  return (
    <AdminLayout title="Kelola Berita">
      <div>
        {/* Form Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            {editId ? 'Edit Berita' : 'Tambah Berita Baru'}
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
                placeholder="Masukkan judul berita"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Kategori</label>
                <select
                  value={form.kategori}
                  onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                >
                  <option>Akademik</option>
                  <option>Prestasi</option>
                  <option>Kegiatan</option>
                  <option>Pengumuman</option>
                  <option>Info</option>
                  <option>Beasiswa</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Penulis</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                placeholder="Nama penulis (opsional)"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Excerpt</label>
              <textarea
                rows="2"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                placeholder="Ringkasan singkat berita (opsional)"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Konten <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={form.konten}
                onChange={(value) => setForm({ ...form, konten: value })}
                placeholder="Tulis konten berita di sini..."
              />
            </div>

            <div>
              <ImageUpload
                label="Gambar Berita"
                value={form.gambar}
                onChange={(url) => setForm({ ...form, gambar: url })}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Tags (pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="pendidikan, islam, pesantren"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
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

        {/* List Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Daftar Berita ({berita.length})</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 text-sm text-gray-600">
            <span>Total: {total || berita.length}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <span className="px-2">Hal {page}</span>
              <button
                onClick={() => {
                  const maxPage = Math.max(1, Math.ceil((total || berita.length) / pageSize));
                  setPage((p) => Math.min(maxPage, p + 1));
                }}
                disabled={berita.length < pageSize || page * pageSize >= (total || berita.length)}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div className="space-y-3 md:hidden">
            {berita.length === 0 ? (
              <div className="rounded-lg border border-slate-200 p-4 text-center text-sm text-gray-600">Belum ada berita</div>
            ) : (
              berita.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-semibold text-slate-800">{item.judul}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.kategori} • {new Date(item.createdAt).toLocaleDateString('id-ID')}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs ${item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item.status}
                    </span>
                    <div className="space-x-1">
                      <button onClick={() => handleEdit(item)} className="rounded-md px-2 py-1 text-blue-600 hover:bg-blue-50" title="Edit"><i className="fas fa-edit"></i></button>
                      <button onClick={() => handleDelete(item.id)} className="rounded-md px-2 py-1 text-red-600 hover:bg-red-50" title="Hapus"><i className="fas fa-trash"></i></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="hidden overflow-x-auto -mx-4 lg:mx-0 md:block">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 lg:px-4 py-2 text-left text-sm">Judul</th>
                  <th className="px-3 lg:px-4 py-2 text-left text-sm">Kategori</th>
                  <th className="px-3 lg:px-4 py-2 text-left text-sm">Status</th>
                  <th className="px-3 lg:px-4 py-2 text-left text-sm">Tanggal</th>
                  <th className="px-3 lg:px-4 py-2 text-center text-sm">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {berita.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-600">Belum ada berita</td>
                  </tr>
                ) : (
                  berita.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 lg:px-4 py-3 text-sm">{item.judul}</td>
                      <td className="px-3 lg:px-4 py-3 text-sm">{item.kategori}</td>
                      <td className="px-3 lg:px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{item.status}</span>
                      </td>
                      <td className="px-3 lg:px-4 py-3 text-sm">{new Date(item.createdAt).toLocaleDateString('id-ID')}</td>
                      <td className="px-3 lg:px-4 py-3 text-center space-x-2">
                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 p-2" title="Edit"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 p-2" title="Hapus"><i className="fas fa-trash"></i></button>
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



