'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { showSuccess, showError, showConfirm } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';

const inputCls = 'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500';
const labelCls = 'block text-gray-700 mb-2 font-semibold text-sm';

const emptyForm = { username: '', password: '', fullName: '', email: '', role: 'staff' };

export default function PenggunaPage() {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ fullName: '', email: '', status: 'active', role: 'staff' });
  const [pwId, setPwId] = useState(null);
  const [pwForm, setPwForm] = useState({ oldPassword: '', newPassword: '' });

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    try {
      setLoading(true);
      const [meRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/api/auth/me`, { credentials: 'include' }),
        fetch(`${API_URL}/api/auth/users`, { credentials: 'include' }),
      ]);
      const meData = await meRes.json();
      const usersData = await usersRes.json();
      if (meData?.success) setMe(meData.data);
      if (usersData?.success) setUsers(usersData.data || []);
      else showError(usersData?.message || 'Gagal memuat data pengguna');
    } catch (e) {
      showError('Gagal memuat data: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.errors?.map((x) => x.msg).join(', ') || data?.message || `HTTP ${res.status}`);
      if (data.success) {
        await showSuccess('Pengguna berhasil ditambahkan!');
        setForm(emptyForm);
        loadAll();
      } else throw new Error(data.message);
    } catch (e) {
      showError('Gagal menambah pengguna: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (u) => {
    setEditId(u.id);
    setEditForm({ fullName: u.fullName || '', email: u.email || '', status: u.status || 'active', role: u.role || 'staff' });
    setPwId(null);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/users/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
      if (data.success) {
        await showSuccess('Pengguna berhasil diupdate!');
        setEditId(null);
        loadAll();
      } else throw new Error(data.message);
    } catch (e) {
      showError('Gagal mengupdate: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    const target = users.find((u) => String(u.id) === String(pwId));
    const isSelf = me && target && String(me.id) === String(target.id);
    if (isSelf && !pwForm.oldPassword) { showError('Password lama harus diisi'); return; }
    if (!pwForm.newPassword || pwForm.newPassword.length < 6) { showError('Password baru minimal 6 karakter'); return; }
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/users/${pwId}/password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ oldPassword: pwForm.oldPassword || undefined, newPassword: pwForm.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
      if (data.success) {
        await showSuccess('Password berhasil diubah!');
        setPwId(null);
        setPwForm({ oldPassword: '', newPassword: '' });
      } else throw new Error(data.message);
    } catch (e) {
      showError('Gagal mengubah password: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (u) => {
    const next = u.status === 'active' ? 'inactive' : 'active';
    const r = await showConfirm(
      next === 'active' ? `Aktifkan akun ${u.username}?` : `Nonaktifkan akun ${u.username}?`,
      next === 'active' ? 'Akun bisa login kembali.' : 'Akun tidak bisa login sampai diaktifkan lagi.'
    );
    if (!r.isConfirmed) return;
    try {
      const res = await fetch(`${API_URL}/api/auth/users/${u.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
      await showSuccess(data.message || 'Status berhasil diubah');
      loadAll();
    } catch (e) {
      showError('Gagal: ' + e.message);
    }
  };

  const handleDelete = async (u) => {
    const r = await showConfirm(`Hapus akun ${u.username}?`, 'Data akan dihapus permanen dan tidak bisa dikembalikan.');
    if (!r.isConfirmed) return;
    try {
      const res = await fetch(`${API_URL}/api/auth/users/${u.id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
      await showSuccess('Pengguna berhasil dihapus');
      loadAll();
    } catch (e) {
      showError('Gagal menghapus: ' + e.message);
    }
  };

  const roleBadge = (role) => {
    const map = { superadmin: 'bg-purple-100 text-purple-800', admin: 'bg-blue-100 text-blue-800', staff: 'bg-slate-100 text-slate-700', admin_psb: 'bg-teal-100 text-teal-800' };
    const labels = { superadmin: 'Superadmin', admin: 'Admin', staff: 'Staff', admin_psb: 'Admin PSB' };
    return <span className={`px-2 py-1 rounded text-xs font-semibold ${map[role] || map.staff}`}>{labels[role] || role}</span>;
  };

  return (
    <AdminLayout title="Manajemen Pengguna">
      <div className="space-y-6">
        {/* Tambah pengguna */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Tambah Pengguna Baru</h3>
          <form onSubmit={handleAdd} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className={labelCls}>Username <span className="text-red-500">*</span></label>
              <input type="text" required minLength={3} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className={inputCls} placeholder="huruf, angka, underscore" />
            </div>
            <div>
              <label className={labelCls}>Password <span className="text-red-500">*</span></label>
              <input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputCls} placeholder="min. 6 karakter" />
            </div>
            <div>
              <label className={labelCls}>Nama Lengkap <span className="text-red-500">*</span></label>
              <input type="text" required minLength={3} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Email <span className="text-red-500">*</span></label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputCls}>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
                <option value="admin_psb">Admin PSB</option>
                {me?.role === 'superadmin' && <option value="superadmin">Superadmin</option>}
              </select>
            </div>
            <div className="flex items-end">
              <button type="submit" disabled={saving} className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2.5 text-white disabled:opacity-50">
                <i className="fas fa-user-plus mr-2"></i>{saving ? 'Menyimpan...' : 'Tambah'}
              </button>
            </div>
          </form>
        </div>

        {/* Daftar pengguna */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Daftar Pengguna ({users.length})</h3>
          {loading ? (
            <p className="text-sm text-gray-600">Memuat data pengguna...</p>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[720px]">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm">Username</th>
                    <th className="px-4 py-2 text-left text-sm">Nama</th>
                    <th className="px-4 py-2 text-left text-sm">Email</th>
                    <th className="px-4 py-2 text-left text-sm">Role</th>
                    <th className="px-4 py-2 text-left text-sm">Status</th>
                    <th className="px-4 py-2 text-center text-sm">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold">{u.username}{me && String(me.id) === String(u.id) && <span className="ml-2 text-xs text-cyan-700">(Anda)</span>}</td>
                      <td className="px-4 py-3 text-sm">{u.fullName}</td>
                      <td className="px-4 py-3 text-sm">{u.email}</td>
                      <td className="px-4 py-3">{roleBadge(u.role)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${u.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {u.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => startEdit(u)} className="rounded-md px-2 py-1 text-blue-600 hover:bg-blue-50" title="Edit"><i className="fas fa-edit"></i></button>
                          <button onClick={() => { setPwId(u.id); setPwForm({ oldPassword: '', newPassword: '' }); setEditId(null); }} className="rounded-md px-2 py-1 text-amber-600 hover:bg-amber-50" title="Ganti password"><i className="fas fa-key"></i></button>
                          <button onClick={() => handleToggleStatus(u)} className="rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100" title={u.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}>
                            <i className={`fas ${u.status === 'active' ? 'fa-ban' : 'fa-check-circle'}`}></i>
                          </button>
                          {me?.role === 'superadmin' && u.role !== 'superadmin' && (
                            <button onClick={() => handleDelete(u)} className="rounded-md px-2 py-1 text-red-600 hover:bg-red-50" title="Hapus"><i className="fas fa-trash"></i></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Panel edit */}
          {editId && (
            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50/50 p-4">
              <h4 className="font-bold mb-4">Edit Pengguna</h4>
              <form onSubmit={handleEdit} className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelCls}>Nama Lengkap</label>
                  <input type="text" value={editForm.fullName} onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className={inputCls}>
                    <option value="active">Aktif</option>
                    <option value="inactive">Nonaktif</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Role {me?.role !== 'superadmin' && <span className="font-normal text-slate-500">(hanya superadmin)</span>}</label>
                  <select value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} className={inputCls} disabled={me?.role !== 'superadmin'}>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                    <option value="admin_psb">Admin PSB</option>
                    <option value="superadmin">Superadmin</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-6 py-2 text-white disabled:opacity-50">
                    <i className="fas fa-save mr-2"></i>Simpan
                  </button>
                  <button type="button" onClick={() => setEditId(null)} className="rounded-lg border border-slate-300 px-5 py-2 text-slate-700">Batal</button>
                </div>
              </form>
            </div>
          )}

          {/* Panel ganti password */}
          {pwId && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
              <h4 className="font-bold mb-4">Ganti Password — {users.find((u) => String(u.id) === String(pwId))?.username}</h4>
              <form onSubmit={handlePassword} className="grid gap-4 md:grid-cols-2 max-w-2xl">
                {me && users.find((u) => String(u.id) === String(pwId)) && String(me.id) === String(pwId) && (
                  <div className="md:col-span-2">
                    <label className={labelCls}>Password Lama <span className="text-red-500">*</span></label>
                    <input type="password" value={pwForm.oldPassword} onChange={(e) => setPwForm({ ...pwForm, oldPassword: e.target.value })} className={inputCls} />
                  </div>
                )}
                <div className="md:col-span-2">
                  <label className={labelCls}>Password Baru <span className="text-red-500">*</span></label>
                  <input type="password" minLength={6} value={pwForm.newPassword} onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })} className={inputCls} placeholder="min. 6 karakter, huruf besar + kecil + angka" />
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" disabled={saving} className="rounded-lg bg-amber-600 px-6 py-2 text-white disabled:opacity-50">
                    <i className="fas fa-key mr-2"></i>Ubah Password
                  </button>
                  <button type="button" onClick={() => setPwId(null)} className="rounded-lg border border-slate-300 px-5 py-2 text-slate-700">Batal</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
