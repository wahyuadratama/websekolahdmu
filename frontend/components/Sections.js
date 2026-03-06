'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_BASE, API_URL } from '@/lib/config';

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
  const testimonials = [
    {
      quote: 'Anak kami lebih mandiri dan teratur. Pembinaan harian terasa nyata karena guru tinggal bersama santri.',
      name: 'Ibu Sari',
      role: 'Orang tua santri kelas 8'
    },
    {
      quote: 'Lingkungan asrama aman dan tenang, jadi kami tenang melepas anak jauh dari rumah.',
      name: 'Bapak Rahman',
      role: 'Orang tua santri kelas 7'
    },
    {
      quote: 'Belajar diniyah dan umum seimbang; saya merasa siap melanjutkan studi dan tetap menjaga adab.',
      name: 'Fauzan',
      role: 'Santri kelas 11'
    }
  ];

  return (
    <section className="bg-white py-20" id="social-proof">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Suara Mereka</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">Testimoni Orang Tua & Santri</h2>
        </div>
        <div className="space-y-5">
          {testimonials.map((item) => (
            <blockquote key={item.name} className="border-l-4 border-blue-600 pl-4">
              <p className="text-gray-700 leading-relaxed">“{item.quote}”</p>
              <footer className="mt-2 text-sm text-gray-500">{item.name} — {item.role}</footer>
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
    fetch(`${API_BASE}/berita?status=published&limit=3`)
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

  const curated = berita.slice(0, 3);

  if (loading) {
    return (
      <section id="berita" className="py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="berita" className="pb-20 pt-10 md:pt-14 bg-white fade-in-up">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-50 px-4 py-2 rounded-full mb-4">
            <span className="text-blue-700 font-semibold text-sm">
              <i className="fas fa-newspaper mr-2"></i>Informasi Terkini
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Berita Terbaru
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">Tiga kabar utama terbaru dari Darul Mukhlisin.</p>
        </div>

        {curated.length === 0 ? (
          <p className="text-gray-600 text-center">Belum ada berita tersedia.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {curated.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.slug}`}
                className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative">
                  {item.gambar ? (
                    <Image
                      src={item.gambar.startsWith('http') ? item.gambar : `${API_URL}${item.gambar}`}
                      alt={item.judul}
                      width={640}
                      height={380}
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-52 w-full items-center justify-center bg-slate-100 text-slate-400">
                      <i className="fas fa-newspaper text-3xl"></i>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700">
                    {item.kategori}
                  </span>
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                    <i className="fas fa-calendar text-[10px]"></i>
                    {new Date(item.createdAt).toLocaleDateString('id-ID')}
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">{item.judul}</h3>
                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {item.excerpt || item.konten.substring(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate text-gray-500">
                      <i className="fas fa-user mr-2 text-xs"></i>{item.author || 'Admin'}
                    </span>
                    <span className="font-semibold text-blue-700">Baca</span>
                  </div>
                </div>
              </Link>
            ))}
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



