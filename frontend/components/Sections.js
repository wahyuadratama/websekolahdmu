'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_BASE, API_URL } from '@/lib/config';

export function FalsafahPondokSection() {
  const items = [
    {
      icon: 'fas fa-heart',
      title: 'Panca Jiwa',
      desc: 'Lima nilai jiwa pondok: keikhlasan, kesederhanaan, berdikari, ukhuwah islamiyah, dan kebebasan yang bertanggung jawab.',
      href: '/falsafah/panca-jiwa'
    },
    {
      icon: 'fas fa-compass',
      title: 'Motto',
      desc: 'Arah pendidikan: berbudi tinggi, berbadan sehat, berpengetahuan luas, dan berpikiran bebas dalam koridor nilai Islam.',
      href: '/falsafah/motto'
    },
    {
      icon: 'fas fa-seedling',
      title: 'Panca Jangka',
      desc: 'Program strategis pengembangan pondok meliputi pendidikan, kaderisasi, fasilitas, pendanaan, dan kesejahteraan keluarga pondok.',
      href: '/falsafah/panca-jangka'
    }
  ];

  return (
    <section className="bg-slate-50 py-12 sm:py-16 md:py-20" id="falsafah-pondok">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Falsafah Pondok</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900 md:text-4xl">Nilai yang Menjiwai Pendidikan</h2>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-emerald-100 bg-white p-5 sm:p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <i className={item.icon}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              <p className="mt-4 text-sm font-semibold text-emerald-700">Baca selengkapnya <i className="fas fa-arrow-right ml-1" /></p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ValuePropSection() {
  const points = [
    {
      title: 'Kurikulum Terpadu',
      desc: "Integrasi diniyah dan umum, menyiapkan santri memahami ilmu syar'i serta kompetensi akademik modern."
    },
    {
      title: 'Akhlak & Tahfiz',
      desc: 'Pembinaan adab harian, tahsin-tahfiz terstruktur, dan lingkungan yang menumbuhkan ruhiyah santri.'
    },
    {
      title: 'Pembinaan Personal',
      desc: 'Pendampingan asatidz/asatidzah yang dekat, mentoring karakter, dan perhatian pada perkembangan individu.'
    }
  ];

  return (
    <section className="bg-white py-20" id="keunggulan">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Keunggulan DMU</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">Pendidikan modern dengan fondasi iman dan adab</h2>
          <p className="mt-3 text-base text-gray-600">Dirancang untuk membentuk generasi berilmu, berkarakter, dan siap melanjutkan studi maupun berkontribusi di masyarakat.</p>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {points.map((item, idx) => (
            <div key={item.title} className="grid gap-3 py-5 md:grid-cols-[80px_1fr] md:gap-6">
              <p className="text-sm font-semibold text-blue-700">0{idx + 1}</p>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  const points = [
    {
      title: 'Pengasuhan Aman 24/7',
      desc: 'Asrama terpantau dengan pendamping yang tinggal bersama santri, memastikan keamanan dan kedisiplinan harian.'
    },
    {
      title: 'Guru Tinggal & Membina',
      desc: 'Asatidz/asatidzah hadir di lingkungan pesantren sepanjang waktu, memberi mentoring karakter dan belajar yang dekat.'
    },
    {
      title: 'Karakter & Akademik Seimbang',
      desc: 'Integrasi diniyah, akademik, dan life skills agar santri berilmu, berakhlak, dan siap bersosial.'
    },
    {
      title: 'Kolaborasi dengan Orang Tua',
      desc: 'Laporan perkembangan berkala dan komunikasi terbuka sehingga orang tua selalu terlibat dalam progres anak.'
    }
  ];

  return (
    <section className="bg-slate-50 py-20" id="mengapa-kami">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Mengapa Memilih DMU</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">Alasan yang membangun kepercayaan orang tua</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">Fokus kami tidak hanya akademik, tetapi juga keamanan, pembinaan karakter, dan komunikasi yang baik dengan keluarga santri.</p>
        </div>
        <div className="space-y-4">
          {points.map((item) => (
            <div key={item.title} className="border-l-4 border-blue-600 bg-white px-4 py-3">
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SocialProofSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/testimoni?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data?.data)) {
          setTestimonials(data.data.slice(0, 6));
        }
      })
      .catch(() => {
        setTestimonials([]);
      });
  }, []);

  const dataView = testimonials;

  return (
    <section className="bg-white py-20" id="social-proof">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Suara Mereka</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">Testimoni Terverifikasi Wali Santri & Santri</h2>
          <p className="mt-3 text-sm text-slate-500"></p>
          <div className="mt-4">
            <Link href="/testimoni/kirim" className="inline-flex items-center rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
              Kirim Testimoni
            </Link>
          </div>
        </div>
        <div className="space-y-5">
          {dataView.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada testimoni yang dipublikasikan saat ini.</p>
          ) : dataView.map((item, idx) => (
            <blockquote key={`${item.name}-${idx}`} className="border-l-4 border-blue-600 pl-4">
              <p className="text-gray-700 leading-relaxed">"{item.quote}"</p>
              <footer className="mt-2 text-sm text-gray-500">
                {item.name} - {item.role}
                {(item.source || item.year) && (
                  <span className="block text-xs text-slate-400 mt-1">Sumber: {item.source || 'Verifikasi internal'}{item.year ? ` (${item.year})` : ''}</span>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTASection() {
  return (
    <section className="bg-slate-900 py-20 text-white" id="ajakan">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-200">Informasi Pendaftaran</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Siap bergabung bersama DMU?</h2>
            <p className="mt-3 text-slate-300">Tim kami siap membantu proses pendaftaran dan konsultasi pendidikan putra-putri Anda.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="#pendaftaran" className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">Daftar Sekarang</Link>
            <Link href="#kontak" className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10">Hubungi Kami</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BeritaSection() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/berita?status=published&limit=6`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBerita(data.data || []);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const curated = berita.slice(0, 6);

  if (loading) {
    return (
      <section id="berita" className="py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </section>
    );
  }

  const [first, ...rest] = curated;

  return (
    <section id="berita" className="bg-white py-10 sm:py-14 md:py-16 fade-in-up">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 md:text-3xl">Berita Terkini</h2>
          <Link
            href="/berita"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          >
            Lihat Semua Berita
          </Link>
        </div>

        {curated.length === 0 ? (
          <p className="text-gray-600 text-center">Belum ada berita tersedia.</p>
        ) : (
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Link
              href={`/berita/${first.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative">
                {first.gambar ? (
                  <Image
                    src={first.gambar.startsWith('http') ? first.gambar : `${API_URL}${first.gambar}`}
                    alt={first.judul}
                    width={900}
                    height={460}
                    className="h-52 sm:h-64 md:h-80 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-52 sm:h-64 md:h-80 w-full items-center justify-center bg-slate-100 text-slate-400">
                    <i className="fas fa-newspaper text-4xl"></i>
                  </div>
                )}
                <span className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded-full bg-white/95 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-blue-700">
                  {first.kategori}
                </span>
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <p className="mb-2 text-xs text-gray-500">{new Date(first.createdAt).toLocaleDateString('id-ID')}</p>
                <h3 className="line-clamp-2 text-lg sm:text-xl font-bold text-gray-900 md:text-2xl">{first.judul}</h3>
                <p className="mt-2 sm:mt-3 line-clamp-2 sm:line-clamp-3 text-sm leading-relaxed text-gray-600">
                  {first.excerpt || first.konten.substring(0, 180)}...
                </p>
              </div>
            </Link>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 md:p-5">
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-700">Update Terbaru</p>
              <div className="divide-y divide-slate-200">
                {rest.map((item) => (
                  <Link key={item.id} href={`/berita/${item.slug}`} className="block py-3 first:pt-0 last:pb-0">
                    <p className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-blue-700">{item.judul}</p>
                    <p className="mt-1 text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString('id-ID')}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function GaleriSection() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/galeri?limit=4`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGaleri(data.data || []);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="galeri" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="galeri" className="py-20 bg-gradient-to-b from-gray-50 to-white fade-in-up">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-50 px-4 py-2 rounded-full mb-4">
            <span className="text-purple-700 font-semibold text-sm flex items-center justify-center gap-2">
              <i className="fas fa-image"></i>
              Dokumentasi Terpilih
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Galeri Kegiatan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">Empat momen terbaru yang menggambarkan kehidupan pesantren.</p>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galeri.length === 0 ? (
            <p className="text-gray-600 text-center col-span-4">Belum ada foto tersedia.</p>
          ) : (
            galeri.map((item) => (
              <div key={item.id} className="relative overflow-hidden rounded-xl shadow-sm border border-gray-100">
                <Image
                  src={`${API_URL}${item.url}`}
                  alt={item.judul}
                  width={400}
                  height={300}
                  className="w-full h-52 w-full object-cover"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.judul}</p>
                  <p className="text-xs text-gray-500 truncate">{item.deskripsi || 'Dokumentasi kegiatan'}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-8">
          <Link href="/galeri" className="text-purple-700 font-semibold hover:text-purple-800 inline-flex items-center gap-2">
            Lihat Galeri Lengkap <i className="fas fa-arrow-right text-xs"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function GuruSection() {
  const [guru, setGuru] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/guru?limit=4`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGuru(data.data || []);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="guru" className="py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="guru" className="py-20 bg-white fade-in-up">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 px-4 py-2 rounded-full mb-4">
              <span className="text-green-600 font-bold text-sm inline-flex items-center gap-2">
                <Image src="https://img.icons8.com/ios-filled/24/16a34a/teacher.png" alt="Pengajar" width={16} height={16} className="w-4 h-4" />
                PENGAJAR PROFESIONAL
              </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Tenaga Pendidik
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guru.length === 0 ? (
            <p className="text-gray-600 text-center col-span-4">Belum ada data guru tersedia.</p>
          ) : (
            guru.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden text-center card-hover">
                <Image
                  src={item.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.nama)}&size=200`}
                  alt={item.nama}
                  width={200}
                  height={200}
                  className="w-full h-52 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{item.nama}</h3>
                  <p className="text-blue-600 font-semibold mb-1">
                    {item.mapel || item.jabatan || 'Guru'}
                  </p>
                  <p className="text-gray-600 text-sm">{item.pendidikan}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export function KontakSection() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      nama: e.target.nama.value,
      subjek: e.target.subjek.value,
      pesan: e.target.pesan.value,
    };

    try {
      const response = await fetch(`${API_BASE}/pesan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
        e.target.reset();
      } else {
        alert('Gagal mengirim pesan: ' + data.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontak" className="py-20 bg-gradient-to-b from-gray-50 to-white fade-in-up">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              <span className="font-bold text-sm text-blue-600 inline-flex items-center gap-2">
                <Image src="https://img.icons8.com/ios-filled/24/2563eb/phone.png" alt="Kontak" width={16} height={16} className="w-4 h-4" />
                KONTAK KAMI
              </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 text-lg">Kami siap membantu Anda</p>
          <div className="w-24 h-1 mx-auto rounded-full mt-4 bg-blue-500"></div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-bold mb-4 text-blue-500">
                Informasi Kontak
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-blue-500 mt-1 mr-3"></i>
                  <p className="text-gray-700">
                    Kp.Kubang Sari RT/RW 02/05 Desa.Tenjolaut Kec.Cikalong Wetan
                    Kab.Bandung Barat Jawa Barat 40395
                  </p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-blue-500 mr-3"></i>
                  <p className="text-gray-700">(+62)87825279426 (Ahmad Saepudin)</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope text-blue-500 mr-3"></i>
                  <p className="text-gray-700">info@darulmukhlisin.sch.id</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-clock text-blue-500 mr-3"></i>
                  <p className="text-gray-700">Senin - Jumat: 07.00 - 16.00 WIB</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-500">Lokasi Kami</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15842.434893826946!2d107.412406!3d-6.7102039!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6903143308c765%3A0x4264f530a5f72332!2sPondok%20Pesantren%20Modern%20Darul%20Mukhlisin!5e0!3m2!1sid!2sid!4v1702000000000!5m2!1sid!2sid"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
              <a
                href="https://maps.app.goo.gl/Wrjm7MmngSS7wQ9D6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-500 hover:text-blue-600 font-semibold"
              >
                <i className="fas fa-external-link-alt mr-2"></i>Buka di Google Maps
              </a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-500">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Subjek</label>
                <input
                  type="text"
                  name="subjek"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Pesan</label>
                <textarea
                  name="pesan"
                  rows="4"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold disabled:opacity-50"
              >
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}



