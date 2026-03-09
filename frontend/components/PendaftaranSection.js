'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_BASE } from '@/lib/config';

export default function PendaftaranSection() {
  const waTemplate = encodeURIComponent(
    "Assalamu'alaikum Admin PPSB Darul Mukhlisin.%0A%0ASaya ingin konsultasi terkait:%0A1) Alur PPSB%0A2) Biaya pendidikan%0A3) Program beasiswa%0A%0ANama wali: \nNama calon santri: \nAsal sekolah: "
  );
  const waPpsbUrl = `https://wa.me/6285320753796?text=${waTemplate}`;
  const [pendaftar, setPendaftar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fromPpsb, setFromPpsb] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/pendaftaran/count`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPendaftar(data.data.count);
        }
      })
      .catch(err => console.error('Error:', err));
  }, []);

  useEffect(() => {
    const checkEntry = () => {
      const hashOk = window.location.hash.includes('pendaftaran-form') || window.location.hash.includes('pendaftaran');
      const qs = new URLSearchParams(window.location.search);
      const queryOk = qs.get('openPpsbForm') === '1';

      if (hashOk || queryOk) {
        setIsOpen(true);
        setFromPpsb(true);
      } else {
        setIsOpen(false);
        setFromPpsb(false);
      }
    };

    checkEntry();
    window.addEventListener('hashchange', checkEntry);
    window.addEventListener('popstate', checkEntry);
    return () => {
      window.removeEventListener('hashchange', checkEntry);
      window.removeEventListener('popstate', checkEntry);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      nama: e.target.nama.value,
      nisn: e.target.nisn.value,
      tempat_lahir: e.target.tempat_lahir.value,
      tanggal_lahir: e.target.tanggal_lahir.value,
      jenis_kelamin: e.target.jenis_kelamin.value,
      asal_sekolah: e.target.asal_sekolah.value,
      alamat: e.target.alamat.value,
      nama_ortu: e.target.nama_ortu.value,
      telepon: e.target.telepon.value,
      email: e.target.email.value || '',
      website: e.target.website?.value || '',
    };

    try {
      const response = await fetch(`${API_BASE}/pendaftaran`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Pendaftaran berhasil! No. Pendaftaran: ${data.data.noPendaftaran}`);
        e.target.reset();
        setPendaftar(prev => prev + 1);
      } else {
        alert('Pendaftaran gagal: ' + data.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pendaftaran" className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 px-4 py-2 rounded-full mb-4">
            <span className="font-bold text-sm text-blue-600 inline-flex items-center gap-2">
              <Image src="https://img.icons8.com/ios-filled/24/3b82f6/edit.png" alt="Pendaftaran" width={16} height={16} className="w-4 h-4" />
              PENDAFTARAN DIBUKA
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            PPSB (Penerimaan dan Pendaftaran Santri Baru)
          </h2>
        </div>

        <div className="mx-auto max-w-7xl">
          {!isOpen ? (
            <div className="mx-auto max-w-3xl rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm md:p-8">
              <p className="text-gray-700 leading-relaxed">
                Untuk melanjutkan pendaftaran, silakan baca informasi lengkap terlebih dahulu pada halaman PPSB.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Link href="/ppsb" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                  <i className="fas fa-circle-info mr-2"></i>Lihat Halaman PPSB
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="space-y-6 lg:col-span-2">
                <div className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white shadow-xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                      <i className="fas fa-users text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Kuota Terbatas</h3>
                      <p className="text-sm text-green-100">Segera daftarkan!</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/20 p-6 text-center backdrop-blur-sm">
                    <p className="mb-2 text-sm opacity-90">Pendaftar Saat Ini</p>
                    <p className="mb-2 text-5xl font-bold">{pendaftar}</p>
                    <p className="text-sm opacity-90">dari 100 kuota tersedia</p>
                    <div className="mt-4 h-2 rounded-full bg-white/20">
                      <div className="h-2 rounded-full bg-white transition-all duration-500" style={{ width: `${(pendaftar / 100) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg">
                  <h4 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800"><i className="fas fa-list-check text-blue-500"></i>Alur PPSB</h4>
                  <ol className="space-y-3 text-sm md:text-base">
                    <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">1</span><span className="text-gray-700"><strong>Isi formulir online</strong> dengan data calon santri.</span></li>
                    <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">2</span><span className="text-gray-700"><strong>Verifikasi berkas</strong> oleh admin.</span></li>
                    <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">3</span><span className="text-gray-700"><strong>Seleksi</strong> (tes akademik/wawancara) sesuai jadwal.</span></li>
                    <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">4</span><span className="text-gray-700"><strong>Pengumuman hasil</strong> dan <strong>daftar ulang</strong>.</span></li>
                  </ol>
                  <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-gray-700">
                    <p><strong>Syarat:</strong> NISN, KK/KTP orang tua, akta/ijazah terakhir (sesuai ketentuan admin).</p>
                    <p className="mt-2"><strong>Biaya:</strong> informasi biaya dan skema beasiswa disampaikan saat verifikasi admin.</p>
                    <p className="mt-2"><strong>Jadwal:</strong> seleksi & daftar ulang diinformasikan melalui WhatsApp resmi.</p>
                  </div>
                  <a href={waPpsbUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-white font-semibold hover:bg-green-700 transition">
                    <i className="fab fa-whatsapp mr-2"></i> Tanya Admin PPSB
                  </a>
                </div>
              </div>

              <div className="lg:col-span-3">
                {fromPpsb && (
                  <div className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <i className="fas fa-circle-check mr-2"></i>Anda datang dari halaman PPSB
                  </div>
                )}
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                  <div className="mb-6 flex items-center justify-between border-b pb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100"><i className="fas fa-edit text-blue-600"></i></div>
                      <h3 className="text-2xl font-bold text-gray-800">Form Pendaftaran</h3>
                    </div>
                    <button type="button" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-500 hover:text-gray-700">Sembunyikan</button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="text" name="website" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />
                    <div className="grid gap-4 md:grid-cols-2">
                      <div><label className="mb-2 block text-sm font-medium text-gray-700">Nama Lengkap <span className="text-red-500">*</span></label><input type="text" name="nama" required placeholder="Masukkan nama lengkap" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                      <div><label className="mb-2 block text-sm font-medium text-gray-700">NISN <span className="text-red-500">*</span></label><input type="text" name="nisn" required placeholder="Nomor Induk Siswa Nasional" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div><label className="mb-2 block text-sm font-medium text-gray-700">Tempat Lahir <span className="text-red-500">*</span></label><input type="text" name="tempat_lahir" required placeholder="Kota/Kabupaten" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                      <div><label className="mb-2 block text-sm font-medium text-gray-700">Tanggal Lahir <span className="text-red-500">*</span></label><input type="date" name="tanggal_lahir" required className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div><label className="mb-2 block text-sm font-medium text-gray-700">Jenis Kelamin <span className="text-red-500">*</span></label><select name="jenis_kelamin" required className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Pilih jenis kelamin</option><option value="Laki-laki">Laki-laki</option><option value="Perempuan">Perempuan</option></select></div>
                      <div><label className="mb-2 block text-sm font-medium text-gray-700">Asal Sekolah <span className="text-red-500">*</span></label><input type="text" name="asal_sekolah" required placeholder="Nama sekolah asal" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                    </div>

                    <div><label className="mb-2 block text-sm font-medium text-gray-700">Alamat Lengkap <span className="text-red-500">*</span></label><textarea name="alamat" rows="3" required placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea></div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div><label className="mb-2 block text-sm font-medium text-gray-700">Nama Orang Tua/Wali <span className="text-red-500">*</span></label><input type="text" name="nama_ortu" required placeholder="Nama lengkap orang tua" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                      <div><label className="mb-2 block text-sm font-medium text-gray-700">No. Telepon/WA <span className="text-red-500">*</span></label><input type="tel" name="telepon" required placeholder="08xxxxxxxxxx" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                    </div>

                    <div><label className="mb-2 block text-sm font-medium text-gray-700">Email (Opsional)</label><input type="email" name="email" placeholder="email@example.com" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>

                    <div className="pt-4">
                      <button type="submit" disabled={loading} className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-cyan-700 hover:shadow-xl disabled:opacity-50">
                        {loading ? (<><i className="fas fa-spinner fa-spin mr-2"></i>Mengirim Data...</>) : (<><i className="fas fa-paper-plane mr-2"></i>Daftar Sekarang</>)}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">FAQ PPSB</h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div><p className="font-semibold">Apakah pendaftaran dapat dilakukan secara online?</p><p>Pendaftaran awal dapat dilakukan melalui formulir pada website resmi. Tim administrasi akan melakukan verifikasi dan menghubungi wali calon santri untuk tahapan selanjutnya.</p></div>
                    <div><p className="font-semibold">Bagaimana informasi biaya pendidikan disampaikan?</p><p>Rincian biaya pendidikan, daftar ulang, dan ketentuan administrasi disampaikan secara resmi oleh admin PPSB setelah proses verifikasi data.</p></div>
                    <div><p className="font-semibold">Apakah tersedia program beasiswa?</p><p>Tersedia program beasiswa dengan ketentuan tertentu, mengikuti kebijakan pondok serta hasil seleksi akademik dan non-akademik.</p></div>
                  </div>
                  <Link href="/ppsb" className="mt-4 inline-flex items-center text-blue-700 font-semibold hover:text-blue-800">
                    Lihat panduan PPSB lengkap <i className="fas fa-arrow-right ml-2 text-xs"></i>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
