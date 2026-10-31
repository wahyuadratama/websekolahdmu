'use client';

import { useEffect, useId, useState } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import { showSuccess, showError, showConfirm } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';
import { DEFAULT_SITE_SETTINGS } from '@/lib/siteSettings';

const TABS = [
  { id: 'identitas', label: 'Identitas & SEO', icon: 'fa-id-card' },
  { id: 'kontak', label: 'Kontak & Medsos', icon: 'fa-address-book' },
  { id: 'homepage', label: 'Konten Homepage', icon: 'fa-home' },
  { id: 'navigasi', label: 'Navigasi', icon: 'fa-bars' },
  { id: 'maintenance', label: 'Mode Maintenance', icon: 'fa-tools' },
];

const inputCls = 'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500';
const labelCls = 'block text-gray-700 mb-2 font-semibold text-sm';
const sectionTitleCls = 'text-lg sm:text-xl font-bold mb-1';
const sectionDescCls = 'text-gray-600 mb-6 text-sm';

// Upload gambar kecil khusus halaman ini (id unik per field)
function ImageField({ label, value, onChange }) {
  const uid = useId();
  const [uploading, setUploading] = useState(false);
  const preview = value
    ? (/^https?:\/\//i.test(value) ? value : value.startsWith('/images/') ? value : `${API_URL}${value}`)
    : '';

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('File harus berupa gambar'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('Ukuran file maksimal 5MB'); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch(`${API_URL}/api/upload`, { method: 'POST', body: fd, credentials: 'include' });
      const data = await res.json();
      if (data.success) onChange(data.path);
      else alert('Gagal upload: ' + (data.message || ''));
    } catch (err) {
      alert('Error upload: ' + err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <input id={uid} type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
          <label htmlFor={uid} className={`inline-flex cursor-pointer items-center rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
            <i className="fas fa-upload mr-2"></i>{uploading ? 'Mengupload...' : 'Pilih Gambar'}
          </label>
          {value && (
            <button type="button" onClick={() => onChange('')} className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600">
              <i className="fas fa-trash mr-2"></i>Hapus
            </button>
          )}
        </div>
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="/images/LOGO DMU.png atau URL" className={inputCls} />
        {preview && (
          <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
            <Image src={preview} alt="Preview" fill className="object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}

function SaveBar({ onSave, onReset, saving, dirty }) {
  return (
    <div className="sticky bottom-2 z-10 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-md backdrop-blur">
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onSave} disabled={saving || !dirty} className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2 text-white disabled:opacity-50">
          <i className="fas fa-save mr-2"></i>{saving ? 'Menyimpan...' : 'Simpan'}
        </button>
        <button type="button" onClick={onReset} disabled={saving || !dirty} className="rounded-lg border border-slate-300 px-5 py-2 text-slate-700 disabled:opacity-50">
          Reset
        </button>
      </div>
    </div>
  );
}

export default function PengaturanSitusPage() {
  const [tab, setTab] = useState('identitas');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState(DEFAULT_SITE_SETTINGS);
  const [initial, setInitial] = useState(DEFAULT_SITE_SETTINGS);

  useEffect(() => { loadSettings(); }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/settings/site`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data) {
        const merged = { ...DEFAULT_SITE_SETTINGS };
        for (const k of Object.keys(DEFAULT_SITE_SETTINGS)) {
          if (json.data[k] !== null && json.data[k] !== undefined) {
            merged[k] = Array.isArray(DEFAULT_SITE_SETTINGS[k])
              ? (Array.isArray(json.data[k]) ? json.data[k] : DEFAULT_SITE_SETTINGS[k])
              : { ...DEFAULT_SITE_SETTINGS[k], ...json.data[k] };
          }
        }
        setData(merged);
        setInitial(JSON.parse(JSON.stringify(merged)));
      }
    } catch (e) {
      showError('Gagal memuat pengaturan situs: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const setSection = (section, patch) => {
    setData((prev) => ({ ...prev, [section]: Array.isArray(patch) ? patch : { ...prev[section], ...patch } }));
  };

  const saveSection = async (section) => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/settings/site`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ [section]: data[section] }),
      });
      const json = await res.json();
      if (json.success) {
        setInitial((prev) => ({ ...prev, [section]: JSON.parse(JSON.stringify(data[section])) }));
        await showSuccess('Pengaturan berhasil disimpan!');
      } else {
        showError(json.message || 'Gagal menyimpan');
      }
    } catch (e) {
      showError('Terjadi kesalahan: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const resetSection = (section) => setSection(section, JSON.parse(JSON.stringify(initial[section])));
  const isDirty = (section) => JSON.stringify(data[section]) !== JSON.stringify(initial[section]);

  // ---- Navigasi helpers ----
  const updateNavItem = (idx, patch) => {
    const next = [...data.navigation];
    next[idx] = { ...next[idx], ...patch };
    setSection('navigation', next);
  };
  const addNavItem = () => setSection('navigation', [...data.navigation, { label: '', url: '', visible: true, children: [] }]);
  const removeNavItem = async (idx) => {
    const r = await showConfirm('Hapus item navigasi ini?', 'Item akan hilang dari menu website.');
    if (r.isConfirmed) setSection('navigation', data.navigation.filter((_, i) => i !== idx));
  };
  const updateNavChild = (idx, cidx, patch) => {
    const next = [...data.navigation];
    const children = [...(next[idx].children || [])];
    children[cidx] = { ...children[cidx], ...patch };
    next[idx] = { ...next[idx], children };
    setSection('navigation', next);
  };
  const addNavChild = (idx) => {
    const next = [...data.navigation];
    next[idx] = { ...next[idx], children: [...(next[idx].children || []), { label: '', url: '', visible: true }] };
    setSection('navigation', next);
  };
  const removeNavChild = (idx, cidx) => {
    const next = [...data.navigation];
    next[idx] = { ...next[idx], children: (next[idx].children || []).filter((_, i) => i !== cidx) };
    setSection('navigation', next);
  };

  // ---- Hero slides helpers ----
  const updateSlide = (idx, patch) => {
    const slides = [...data.homepage.heroSlides];
    slides[idx] = { ...slides[idx], ...patch };
    setSection('homepage', { heroSlides: slides });
  };
  const addSlide = () => setSection('homepage', { heroSlides: [...data.homepage.heroSlides, { image: '', title: '', subtitle: '', ctaText: '', ctaUrl: '' }] });
  const removeSlide = async (idx) => {
    const r = await showConfirm('Hapus slide ini?', 'Slide akan hilang dari hero homepage.');
    if (r.isConfirmed) setSection('homepage', { heroSlides: data.homepage.heroSlides.filter((_, i) => i !== idx) });
  };

  return (
    <AdminLayout title="Pengaturan Situs">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className={sectionTitleCls}>Pengaturan Situs</h3>
        <p className={sectionDescCls}>Kontrol penuh tampilan & informasi website dari sini — tanpa mengubah kode.</p>

        {loading && <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-sm text-blue-700 mb-4">Memuat pengaturan situs...</div>}

        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${tab === t.id ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              <i className={`fas ${t.icon} mr-2`}></i>{t.label}
            </button>
          ))}
        </div>

        <fieldset disabled={loading || saving}>
          {/* ===== IDENTITAS & SEO ===== */}
          {tab === 'identitas' && (
            <div className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelCls}>Nama Situs</label>
                  <input type="text" value={data.identity.siteName} onChange={(e) => setSection('identity', { siteName: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Nama Situs (Arab)</label>
                  <input type="text" value={data.identity.siteNameArabic} onChange={(e) => setSection('identity', { siteNameArabic: e.target.value })} className={inputCls} dir="rtl" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Tagline</label>
                <textarea rows={2} value={data.identity.tagline} onChange={(e) => setSection('identity', { tagline: e.target.value })} className={inputCls} />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <ImageField label="Logo Situs" value={data.identity.logoUrl} onChange={(v) => setSection('identity', { logoUrl: v })} />
                <ImageField label="Favicon" value={data.identity.faviconUrl} onChange={(v) => setSection('identity', { faviconUrl: v })} />
              </div>
              <div>
                <label className={labelCls}>Teks Footer (copyright)</label>
                <input type="text" value={data.identity.footerText} onChange={(e) => setSection('identity', { footerText: e.target.value })} className={inputCls} />
              </div>
              <div className="border-t border-slate-200 pt-5">
                <h4 className="font-bold mb-4">SEO Dasar</h4>
                <div className="space-y-5">
                  <div>
                    <label className={labelCls}>Judul Default (meta title)</label>
                    <input type="text" value={data.seo.defaultTitle} onChange={(e) => setSection('seo', { defaultTitle: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Deskripsi Default (meta description)</label>
                    <textarea rows={2} value={data.seo.defaultDescription} onChange={(e) => setSection('seo', { defaultDescription: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Kata Kunci (keywords)</label>
                    <input type="text" value={data.seo.keywords} onChange={(e) => setSection('seo', { keywords: e.target.value })} className={inputCls} />
                  </div>
                </div>
              </div>
              <SaveBar onSave={() => saveSection('identity').then(() => saveSection('seo'))} onReset={() => { resetSection('identity'); resetSection('seo'); }} saving={saving} dirty={isDirty('identity') || isDirty('seo')} />
            </div>
          )}

          {/* ===== KONTAK & MEDSOS ===== */}
          {tab === 'kontak' && (
            <div className="space-y-5">
              <div>
                <label className={labelCls}>Alamat Lengkap</label>
                <textarea rows={2} value={data.contact.address} onChange={(e) => setSection('contact', { address: e.target.value })} className={inputCls} />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelCls}>Telepon</label>
                  <input type="text" value={data.contact.phone} onChange={(e) => setSection('contact', { phone: e.target.value })} className={inputCls} placeholder="(+62) 878-2527-9426" />
                </div>
                <div>
                  <label className={labelCls}>Nama Kontak (label telepon)</label>
                  <input type="text" value={data.contact.phoneLabel} onChange={(e) => setSection('contact', { phoneLabel: e.target.value })} className={inputCls} placeholder="Ahmad Saepudin" />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input type="email" value={data.contact.email} onChange={(e) => setSection('contact', { email: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Jam Operasional</label>
                  <input type="text" value={data.contact.hours} onChange={(e) => setSection('contact', { hours: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Tautan Google Maps ("Lihat Lokasi")</label>
                <input type="text" value={data.contact.mapsUrl} onChange={(e) => setSection('contact', { mapsUrl: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Embed Google Maps (iframe src)</label>
                <textarea rows={3} value={data.contact.mapsEmbed} onChange={(e) => setSection('contact', { mapsEmbed: e.target.value })} className={inputCls} />
              </div>
              <div className="border-t border-slate-200 pt-5">
                <h4 className="font-bold mb-4">Media Sosial</h4>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelCls}><i className="fab fa-facebook text-blue-600 mr-2"></i>Facebook</label>
                    <input type="text" value={data.social.facebook} onChange={(e) => setSection('social', { facebook: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}><i className="fab fa-instagram text-pink-600 mr-2"></i>Instagram</label>
                    <input type="text" value={data.social.instagram} onChange={(e) => setSection('social', { instagram: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}><i className="fab fa-youtube text-red-600 mr-2"></i>YouTube</label>
                    <input type="text" value={data.social.youtube} onChange={(e) => setSection('social', { youtube: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}><i className="fab fa-whatsapp text-green-600 mr-2"></i>WhatsApp (angka saja)</label>
                    <input type="text" value={data.social.whatsapp} onChange={(e) => setSection('social', { whatsapp: e.target.value })} className={inputCls} placeholder="6287825279426" />
                  </div>
                </div>
              </div>
              <SaveBar onSave={() => saveSection('contact').then(() => saveSection('social'))} onReset={() => { resetSection('contact'); resetSection('social'); }} saving={saving} dirty={isDirty('contact') || isDirty('social')} />
            </div>
          )}

          {/* ===== HOMEPAGE ===== */}
          {tab === 'homepage' && (
            <div className="space-y-5">
              <div>
                <label className={labelCls}>Judul Sambutan (Hero)</label>
                <input type="text" value={data.homepage.welcomeTitle} onChange={(e) => setSection('homepage', { welcomeTitle: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Teks Sambutan (Hero)</label>
                <textarea rows={3} value={data.homepage.welcomeText} onChange={(e) => setSection('homepage', { welcomeText: e.target.value })} className={inputCls} />
              </div>
              <div className="border-t border-slate-200 pt-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold">Slide Hero Kustom</h4>
                    <p className="text-sm text-gray-600">Kosongkan untuk memakai foto galeri terbaru otomatis (seperti sekarang).</p>
                  </div>
                  <button type="button" onClick={addSlide} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white hover:bg-cyan-700">
                    <i className="fas fa-plus mr-2"></i>Tambah Slide
                  </button>
                </div>
                <div className="space-y-4">
                  {data.homepage.heroSlides.length === 0 && (
                    <p className="text-sm text-gray-500 rounded-lg bg-slate-50 border border-slate-200 p-4">Belum ada slide kustom — hero memakai foto galeri terbaru.</p>
                  )}
                  {data.homepage.heroSlides.map((slide, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-200 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">Slide {idx + 1}</span>
                        <button type="button" onClick={() => removeSlide(idx)} className="text-red-600 hover:text-red-800 text-sm">
                          <i className="fas fa-trash mr-1"></i>Hapus
                        </button>
                      </div>
                      <ImageField label="Gambar Slide" value={slide.image} onChange={(v) => updateSlide(idx, { image: v })} />
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className={labelCls}>Judul Slide (opsional)</label>
                          <input type="text" value={slide.title || ''} onChange={(e) => updateSlide(idx, { title: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Subjudul (opsional)</label>
                          <input type="text" value={slide.subtitle || ''} onChange={(e) => updateSlide(idx, { subtitle: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Teks Tombol (opsional)</label>
                          <input type="text" value={slide.ctaText || ''} onChange={(e) => updateSlide(idx, { ctaText: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Tautan Tombol (opsional)</label>
                          <input type="text" value={slide.ctaUrl || ''} onChange={(e) => updateSlide(idx, { ctaUrl: e.target.value })} className={inputCls} placeholder="/psb" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <SaveBar onSave={() => saveSection('homepage')} onReset={() => resetSection('homepage')} saving={saving} dirty={isDirty('homepage')} />
            </div>
          )}

          {/* ===== NAVIGASI ===== */}
          {tab === 'navigasi' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Atur item menu utama website. Centang "Tampil" untuk menampilkan.</p>
                <button type="button" onClick={addNavItem} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white hover:bg-cyan-700">
                  <i className="fas fa-plus mr-2"></i>Tambah Item
                </button>
              </div>
              {data.navigation.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 p-4 space-y-3">
                  <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]">
                    <input type="text" value={item.label} onChange={(e) => updateNavItem(idx, { label: e.target.value })} className={inputCls} placeholder="Label menu" />
                    <input type="text" value={item.url} onChange={(e) => updateNavItem(idx, { url: e.target.value })} className={inputCls} placeholder="URL, mis. /berita atau /#profil" />
                    <label className="flex items-center gap-2 text-sm text-slate-700 whitespace-nowrap">
                      <input type="checkbox" checked={item.visible !== false} onChange={(e) => updateNavItem(idx, { visible: e.target.checked })} className="h-4 w-4" /> Tampil
                    </label>
                    <button type="button" onClick={() => removeNavItem(idx)} className="text-red-600 hover:text-red-800 text-sm whitespace-nowrap">
                      <i className="fas fa-trash mr-1"></i>Hapus
                    </button>
                  </div>
                  <div className="pl-4 border-l-2 border-slate-100 space-y-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Submenu</p>
                    {(item.children || []).map((child, cidx) => (
                      <div key={cidx} className="grid gap-2 md:grid-cols-[1fr_1fr_auto_auto]">
                        <input type="text" value={child.label} onChange={(e) => updateNavChild(idx, cidx, { label: e.target.value })} className={inputCls} placeholder="Label submenu" />
                        <input type="text" value={child.url} onChange={(e) => updateNavChild(idx, cidx, { url: e.target.value })} className={inputCls} placeholder="URL submenu" />
                        <label className="flex items-center gap-2 text-sm text-slate-700 whitespace-nowrap">
                          <input type="checkbox" checked={child.visible !== false} onChange={(e) => updateNavChild(idx, cidx, { visible: e.target.checked })} className="h-4 w-4" /> Tampil
                        </label>
                        <button type="button" onClick={() => removeNavChild(idx, cidx)} className="text-red-600 hover:text-red-800 text-sm">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addNavChild(idx)} className="text-sm text-cyan-700 hover:text-cyan-900">
                      <i className="fas fa-plus mr-1"></i>Tambah submenu
                    </button>
                  </div>
                </div>
              ))}
              <SaveBar onSave={() => saveSection('navigation')} onReset={() => resetSection('navigation')} saving={saving} dirty={isDirty('navigation')} />
            </div>
          )}

          {/* ===== MAINTENANCE ===== */}
          {tab === 'maintenance' && (
            <div className="space-y-5">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                Saat mode maintenance aktif, seluruh halaman publik menampilkan pesan pemeliharaan.
                Halaman <strong>/login</strong> dan <strong>/admin</strong> tetap bisa diakses.
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={!!data.maintenance.enabled} onChange={(e) => setSection('maintenance', { enabled: e.target.checked })} className="h-5 w-5" />
                <span className="font-semibold">Aktifkan mode maintenance</span>
              </label>
              <div>
                <label className={labelCls}>Pesan Maintenance</label>
                <textarea rows={3} value={data.maintenance.message} onChange={(e) => setSection('maintenance', { message: e.target.value })} className={inputCls} />
              </div>
              {data.maintenance.enabled && (
                <div className="rounded-xl border border-slate-200 p-6 text-center bg-slate-50">
                  <i className="fas fa-tools text-4xl text-slate-400 mb-3"></i>
                  <h4 className="font-bold text-lg mb-2">Pratinjau Pesan</h4>
                  <p className="text-gray-600">{data.maintenance.message}</p>
                </div>
              )}
              <SaveBar onSave={() => saveSection('maintenance')} onReset={() => resetSection('maintenance')} saving={saving} dirty={isDirty('maintenance')} />
            </div>
          )}
        </fieldset>
      </div>
    </AdminLayout>
  );
}
