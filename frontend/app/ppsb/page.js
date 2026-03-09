import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE, UPLOADS_BASE } from '@/lib/config';

export const metadata = {
  title: 'Penerimaan Santri Baru | Pondok Pesantren Modern Darul Mukhlisin',
  description:
    'Informasi resmi Penerimaan dan Pendaftaran Santri Baru Pondok Pesantren Modern Darul Mukhlisin: alur pendaftaran, persyaratan, biaya, dan jadwal ujian.',
  alternates: {
    canonical: 'https://darulmukhlisin.ponpes.id/ppsb',
  },
};

export default async function PPSBPage() {
  const fallbackTimeline = [
    { tanggal: '1 November 2025', nama: 'Pembukaan Pendaftaran Santri Baru', status: 'Buka' },
    { tanggal: '8 Februari 2026', nama: 'Ujian Masuk Gelombang Pertama', status: 'Buka' },
    { tanggal: '7 Juni 2026', nama: 'Ujian Masuk Gelombang Kedua', status: 'Buka' },
    { tanggal: '12 Juli 2026', nama: 'Penutupan Pendaftaran', status: 'Segera' },
  ];

  let ppsbConfig = { timeline: fallbackTimeline, biayaUjian: 'Rp150.000', biaya: null };
  try {
    const res = await fetch(`${API_BASE}/settings/ppsb`, { cache: 'no-store' });
    const data = await res.json();
    if (data?.success && data?.data) {
      ppsbConfig = {
        timeline: Array.isArray(data.data.timeline) && data.data.timeline.length ? data.data.timeline : fallbackTimeline,
        biayaUjian: data.data.biayaUjian || 'Rp150.000',
        biaya: data.data.biaya || null,
      };
    }
  } catch {
    // fallback silently
  }

  const waMessage = encodeURIComponent(`Assalamu'alaikum Admin PPSB Darul Mukhlisin.

Saya ingin konsultasi pendaftaran santri baru.

Nama Wali:
Nama Calon Santri:
Asal Sekolah:
Pertanyaan:`);
  const waLink = `https://wa.me/6285320753796?text=${waMessage}`;

  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20 min-h-screen bg-slate-50 pb-24 md:pb-0">
        <section className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 text-white py-10 sm:py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <p className="text-cyan-100 text-sm uppercase tracking-wider">PPSB Resmi</p>
              <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                PENERIMAAN SANTRI BARU
                <span className="block text-cyan-100 text-xl md:text-2xl mt-1">Pondok Pesantren Modern Darul Mukhlisin</span>
              </h1>
              <p className="mt-4 text-blue-100 leading-relaxed">
                Pondok Pesantren Modern Darul Mukhlisin membuka kesempatan bagi generasi muslim untuk menempuh pendidikan
                berbasis nilai keislaman, keilmuan, dan pembentukan karakter dengan sistem pendidikan pesantren modern.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:flex sm:flex-wrap gap-3">
                <Link href="/?openPpsbForm=1#pendaftaran" className="inline-flex w-full sm:w-auto justify-center items-center rounded-lg bg-white text-indigo-700 px-5 py-3 font-semibold hover:bg-blue-50">
                  Daftar Sekarang
                </Link>
                <a href="#persyaratan" className="inline-flex w-full sm:w-auto justify-center items-center rounded-lg border border-white/40 bg-white/10 text-white px-5 py-3 font-semibold hover:bg-white/20">
                  Lihat Persyaratan
                </a>
                <a href="/uploads/brosur_ppsb_darul_mukhlisin.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto justify-center items-center rounded-lg border border-white/40 bg-white/10 text-white px-5 py-3 font-semibold hover:bg-white/20">
                  <i className="fas fa-file-pdf mr-2"></i>Download Brosur PDF
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-lg">
              <Image
                src={`${UPLOADS_BASE}/brosur%201.jpg`}
                alt="Brosur PPSB Pondok Pesantren Modern Darul Mukhlisin"
                width={1000}
                height={1400}
                className="w-full h-[220px] sm:h-[300px] md:h-[360px] object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-6 sm:py-8 md:py-10 space-y-8 sm:space-y-10">
          <section className="border-b border-slate-200 pb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Tentang Pondok Pesantren Modern Darul Mukhlisin</h2>
            <p className="text-slate-700 leading-relaxed">
              Pondok Pesantren Modern Darul Mukhlisin merupakan perwujudan dari niat ibadah dan kecintaan terhadap sistem pendidikan
              Pondok Pesantren Modern Darussalam Gontor dalam menyiapkan pemimpin umat di masa depan. Pesantren ini bertujuan mencetak
              generasi yang tidak hanya unggul dalam prestasi akademik, tetapi juga mampu menerapkan nilai-nilai kehidupan pesantren dalam
              kehidupan sehari-hari di masyarakat.
            </p>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Sistem pendidikan menggunakan Sistem Muadalah sesuai dengan Undang-Undang Nomor 18 Tahun 2019 tentang Pesantren.
              Pendidikan dilaksanakan selama 6 tahun dengan jenjang setara SMP–SMA / MTs–MA.
            </p>
            <ul className="mt-3 list-disc pl-5 text-slate-700">
              <li>Universitas Al-Azhar Kairo</li>
              <li>Universitas di Turki</li>
              <li>Berbagai universitas dalam negeri</li>
            </ul>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
              <h3 className="text-xl font-bold text-emerald-900 mb-2">Nilai Dasar Pesantren (Panca Jiwa)</h3>
              <ul className="list-disc pl-5 space-y-1 text-emerald-900/90">
                <li>Keikhlasan</li>
                <li>Kesederhanaan</li>
                <li>Berdikari</li>
                <li>Ukhuwah Islamiyah</li>
                <li>Kebebasan</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
              <h3 className="text-xl font-bold text-amber-900 mb-2">Motto Pendidikan</h3>
              <ul className="list-disc pl-5 space-y-1 text-amber-900/90">
                <li>Berbudi Tinggi</li>
                <li>Berbadan Sehat</li>
                <li>Berpengetahuan Luas</li>
                <li>Berpikiran Bebas</li>
              </ul>
            </div>
          </section>

          <section className="border-b border-slate-200 pb-8">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Program Pendidikan</h3>
            <p className="text-slate-700">Program pendidikan diperuntukkan bagi lulusan SD/MI atau sederajat dengan masa pendidikan selama 6 tahun.</p>
            <ul className="mt-3 list-disc pl-5 text-slate-700 space-y-2">
              <li><strong>Kegiatan Intra Kurikuler:</strong> 07.00 – 12.30 WIB</li>
              <li><strong>Kegiatan Ekstra Kurikuler:</strong> 16.00 – 17.00 WIB</li>
            </ul>
          </section>

          <section className="border-b border-slate-200 pb-8">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Tenaga Pendidik</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              <li>Lulusan Pondok Pesantren Modern Darussalam Gontor</li>
              <li>Alumni terbaik Pondok Pesantren Modern Darul Mukhlisin</li>
            </ul>
          </section>

          <section className="border-b border-slate-200 pb-8">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Alur Pendaftaran (Timeline Gelombang)</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {ppsbConfig.timeline.map((item, idx) => (
                <div key={item.nama} className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-indigo-700">Tahap {idx + 1}</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">{item.tanggal}</p>
                      <p className="text-sm text-slate-800 mt-1">{item.nama}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.status === 'Buka' ? 'bg-emerald-100 text-emerald-700' : item.status === 'Tutup' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-slate-700"><strong>Materi Ujian:</strong> Bacaan Al-Qur'an, Bahasa Indonesia, Berhitung</p>
            <p className="text-slate-700"><strong>Biaya administrasi ujian:</strong> {ppsbConfig.biayaUjian}</p>
          </section>

          <section id="persyaratan" className="border-b border-slate-200 pb-8">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Persyaratan Pendaftaran</h3>
            <ul className="space-y-2 text-slate-700">
              {[
                'Mengisi formulir pendaftaran bermaterai',
                'Menyerahkan 2 lembar fotokopi surat keterangan lulus dan NISN yang telah dilegalisir',
                'Pas foto berwarna latar merah 3×4 (3 lembar), 4×6 (2 lembar), putri menggunakan jilbab putih',
                'Fotokopi akta kelahiran, KTP orang tua/wali, dan kartu keluarga',
                'Surat keterangan sehat dari dokter',
                'Membayar biaya administrasi pendaftaran',
                'Seluruh berkas dimasukkan dalam map berwarna kuning',
              ].map((it) => (
                <li key={it} className="flex items-start gap-2"><i className="fas fa-check-circle text-emerald-600 mt-1"></i><span>{it}</span></li>
              ))}
            </ul>
          </section>

          <section className="border-b border-slate-200 pb-8">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Biaya Administrasi</h3>
            <div className="grid md:grid-cols-3 gap-4 text-[13px] sm:text-sm leading-relaxed">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Biaya Awal</h4>
                <ul className="space-y-1.5 text-slate-700">
                  {(ppsbConfig.biaya?.awalItems || [
                    'Uang pangkal masuk KMI: Rp1.500.000', 'Uang makan bulanan: Rp400.000', 'Iuran sekolah dan asrama bulanan: Rp200.000',
                    'Uang kesehatan (tahunan): Rp150.000', 'Sewa almari (tahunan): Rp300.000', 'Kasur: Rp550.000',
                    'Kegiatan ekstrakurikuler (tahunan): Rp150.000', 'Buku paket: Rp650.000', 'Iuran Pramuka (tahunan): Rp100.000', 'Iuran kertas (tahunan): Rp100.000'
                  ]).map((x) => <li key={x}>{x}</li>)}
                </ul>
                <p className="mt-2 font-bold text-indigo-700">Total: {ppsbConfig.biaya?.awalTotal || 'Rp4.100.000'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Seragam Putra</h4>
                <ul className="space-y-1.5 text-slate-700">{(ppsbConfig.biaya?.putraItems || ['Kaos olahraga: Rp200.000','Seragam Tapak Suci: Rp160.000','3 kemeja: Rp480.000']).map((x)=> <li key={x}>{x}</li>)}</ul>
                <p className="mt-2 font-bold text-indigo-700">Total: {ppsbConfig.biaya?.putraTotal || 'Rp840.000'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Seragam Putri</h4>
                <ul className="space-y-1.5 text-slate-700">{(ppsbConfig.biaya?.putriItems || ['Kaos olahraga: Rp220.000','Seragam Tapak Suci: Rp160.000','Jubah toska: Rp190.000','Jubah biru: Rp160.000','Jilbab putih & coklat: Rp110.000']).map((x)=> <li key={x}>{x}</li>)}</ul>
                <p className="mt-2 font-bold text-indigo-700">Total: {ppsbConfig.biaya?.putriTotal || 'Rp840.000'}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-amber-700">{ppsbConfig.biaya?.catatan || 'Catatan: Harga sewaktu-waktu dapat berubah.'}</p>
          </section>

          <section className="border-b border-slate-200 pb-8">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">FAQ PPSB</h3>
            <div className="space-y-3">
              {[
                {
                  q: 'Apakah pendaftaran dapat dilakukan secara online?',
                  a: 'Pendaftaran awal dapat dilakukan melalui formulir website resmi. Tim administrasi akan memverifikasi data dan menghubungi wali calon santri.',
                },
                {
                  q: 'Bagaimana informasi biaya pendidikan disampaikan?',
                  a: 'Rincian biaya pendidikan, daftar ulang, dan ketentuan administrasi disampaikan resmi oleh admin PPSB setelah proses verifikasi.',
                },
                {
                  q: 'Apakah tersedia program beasiswa?',
                  a: 'Tersedia program beasiswa dengan ketentuan tertentu sesuai kebijakan pondok dan hasil seleksi.',
                },
              ].map((f) => (
                <details key={f.q} className="group rounded-lg border border-slate-200 bg-white p-4">
                  <summary className="cursor-pointer list-none font-semibold text-slate-800 flex items-center justify-between">
                    {f.q}
                    <i className="fas fa-chevron-down text-xs text-slate-500 group-open:rotate-180 transition-transform"></i>
                  </summary>
                  <p className="mt-2 text-slate-700 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-6">
            <h3 className="text-2xl font-bold">Daftarkan Putra Putri Anda Sekarang</h3>
            <p className="mt-2 text-emerald-100">Bergabunglah bersama Pondok Pesantren Modern Darul Mukhlisin untuk membentuk generasi muslim yang berilmu, berakhlak, dan berjiwa pemimpin.</p>
            <div className="mt-5 grid grid-cols-1 sm:flex sm:flex-wrap gap-3">
              <Link href="/?openPpsbForm=1#pendaftaran" className="inline-flex w-full sm:w-auto justify-center items-center rounded-lg bg-white text-emerald-700 px-5 py-3 font-semibold hover:bg-emerald-50">Daftar Sekarang</Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto justify-center items-center rounded-lg bg-slate-900 px-5 py-3 font-semibold hover:bg-slate-800">
                <i className="fab fa-whatsapp mr-2"></i>Hubungi Admin PPSB
              </a>
            </div>
          </section>
        </section>
      </main>

      <a href={waLink} target="_blank" rel="noopener noreferrer" className="md:hidden fixed bottom-4 left-4 right-4 z-50 inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white py-3.5 font-bold shadow-lg" style={{ paddingBottom: 'calc(0.875rem + env(safe-area-inset-bottom))' }}>
        <i className="fab fa-whatsapp mr-2"></i>Chat Admin PPSB
      </a>

      <Footer />
    </>
  );
}
