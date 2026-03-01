'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_BASE, API_URL } from '@/lib/config';

export function ValuePropSection() {
  return (
    <section className="py-16 bg-white" id="keunggulan">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            <i className="fas fa-shield-alt"></i>
            <span>Keunggulan DMU</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-3">
            Pesantren modern berakar pada Qur'an dan akhlak
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Fondasi agama yang kuat dipadukan dengan kurikulum modern untuk membentuk generasi berilmu dan beradab.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-blue-700">
              <i className="fas fa-book-open text-lg"></i>
              <h3 className="text-lg font-semibold text-gray-900">Kurikulum Terpadu</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Integrasi diniyah dan umum, menyiapkan santri memahami ilmu syar'i serta kompetensi akademik modern.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-blue-700">
              <i className="fas fa-mosque text-lg"></i>
              <h3 className="text-lg font-semibold text-gray-900">Akhlak & Tahfiz</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pembinaan adab harian, tahsin-tahfiz terstruktur, dan lingkungan yang menumbuhkan ruhiyah santri.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-blue-700">
              <i className="fas fa-users text-lg"></i>
              <h3 className="text-lg font-semibold text-gray-900">Pembinaan Personal</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pendampingan asatidz/asatidzah yang dekat, mentoring karakter, dan perhatian pada perkembangan individu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  const points = [
    {
      icon: 'fas fa-user-shield',
      title: 'Pengasuhan Aman 24/7',
      desc: 'Asrama terpantau dengan pendamping yang tinggal bersama santri, memastikan keamanan dan kedisiplinan harian.',
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      title: 'Guru Tinggal & Membina',
      desc: 'Asatidz/asatidzah hadir di lingkungan pesantren sepanjang waktu, memberi mentoring karakter dan belajar yang dekat.',
    },
    {
      icon: 'fas fa-seedling',
      title: 'Karakter & Akademik Seimbang',
      desc: 'Integrasi diniyah, akademik, dan life skills agar santri berilmu, berakhlak, dan siap bersosial.',
    },
    {
      icon: 'fas fa-handshake',
      title: 'Kolaborasi dengan Orang Tua',
      desc: 'Laporan perkembangan berkala dan komunikasi terbuka sehingga orang tua selalu terlibat dalam progres anak.',
    },
  ];

  return (
    <section className="py-16 bg-white" id="mengapa-kami">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm">
            <i className="fas fa-check-circle"></i>
            <span>Mengapa Memilih DMU</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-3">Alasan yang membangun kepercayaan</h2>
          <p className="text-gray-600 text-base">
            Poin-poin yang penting bagi orang tua dan siswa: keamanan, pembinaan dekat, keseimbangan akademik, dan transparansi.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {points.map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-white">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <i className={`${item.icon} text-lg`}></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
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
      role: 'Orang tua santri kelas 8',
    },
    {
      quote: 'Lingkungan asrama aman dan tenang, jadi kami tenang melepas anak jauh dari rumah.',
      name: 'Bapak Rahman',
      role: 'Orang tua santri kelas 7',
    },
    {
      quote: 'Belajar diniyah dan umum seimbang; saya merasa siap melanjutkan studi dan tetap menjaga adab.',
      name: 'Fauzan',
      role: 'Santri kelas 11',
    },
  ];

  return (
    <section className="py-16 bg-white" id="social-proof">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm">
            <i className="fas fa-comment-dots"></i>
            <span>Suara Mereka</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-3">Kesaksian yang membangun percaya</h2>
          <p className="text-gray-600 text-base">Pendapat orang tua dan santri tentang keamanan, kedekatan pembina, dan keseimbangan belajar.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="h-full p-6 rounded-2xl bg-gray-50">
              <p className="text-gray-800 text-base leading-relaxed mb-4">“{item.quote}”</p>
              <div className="text-sm text-gray-700 font-semibold">{item.name}</div>
              <div className="text-xs text-gray-500">{item.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTASection() {
  return (
    <section className="py-16 bg-white" id="ajakan">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Siap bergabung dengan DMU?</h2>
          <p className="text-gray-600 text-base">
            Mulai dengan pendaftaran atau hubungi kami untuk memastikan kebutuhan anak Anda terjawab.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="#pendaftaran"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="#kontak"
              className="text-blue-700 font-semibold hover:text-blue-800"
            >
              Hubungi Kami
            </Link>
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
    fetch(`${API_BASE}/berita`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBerita(data.data.filter(item => item.status === 'published'));
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
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="berita" className="py-20 bg-white fade-in-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-50 px-4 py-2 rounded-full mb-4">
            <span className="text-blue-700 font-semibold text-sm">
              <i className="fas fa-newspaper mr-2"></i>Informasi Terkini
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Berita Terbaru
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Tiga kabar utama terbaru dari Darul Mukhlisin.</p>
        </div>

        {curated.length === 0 ? (
          <p className="text-gray-600 text-center">Belum ada berita tersedia.</p>
        ) : (
          <div className="space-y-6">
            {curated.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.slug}`}
                className="block bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="md:flex">
                  {item.gambar && (
                    <div className="md:w-1/3">
                      <Image
                        src={item.gambar.startsWith('http') ? item.gambar : `${API_URL}${item.gambar}`}
                        alt={item.judul}
                        width={400}
                        height={240}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center gap-3 text-sm text-blue-700 font-semibold mb-2">
                      <span className="px-3 py-1 bg-blue-50 rounded-full">{item.kategori}</span>
                      <span className="text-gray-500 flex items-center gap-2">
                        <i className="fas fa-calendar text-xs"></i>
                        {new Date(item.createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.judul}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-3">{item.excerpt || item.konten.substring(0, 160)}...</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-2"><i className="fas fa-user text-xs"></i>{item.author || 'Admin'}</span>
                      <span className="flex items-center gap-2 text-blue-700 font-semibold">Baca <i className="fas fa-arrow-right text-xs"></i></span>
                    </div>
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
    fetch(`${API_BASE}/galeri`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGaleri(data.data.slice(0, 4));
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
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="galeri" className="py-20 bg-gradient-to-b from-gray-50 to-white fade-in-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-50 px-4 py-2 rounded-full mb-4">
            <span className="text-purple-700 font-semibold text-sm flex items-center justify-center gap-2">
              <i className="fas fa-image"></i>
              Dokumentasi Terpilih
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Galeri Kegiatan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Empat momen terbaru yang menggambarkan kehidupan pesantren.</p>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                  className="w-full h-48 object-cover"
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
    fetch(`${API_BASE}/guru`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGuru(data.data.slice(0, 4));
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
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="guru" className="py-20 bg-white fade-in-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 px-4 py-2 rounded-full mb-4">
              <span className="text-green-600 font-bold text-sm inline-flex items-center gap-2">
                <Image src="https://img.icons8.com/ios-filled/24/16a34a/teacher.png" alt="Pengajar" width={16} height={16} className="w-4 h-4" />
                PENGAJAR PROFESIONAL
              </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Tenaga Pendidik
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
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
                  className="w-full h-48 object-cover"
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
      email: e.target.email.value,
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
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              <span className="font-bold text-sm text-blue-600 inline-flex items-center gap-2">
                <Image src="https://img.icons8.com/ios-filled/24/2563eb/phone.png" alt="Kontak" width={16} height={16} className="w-4 h-4" />
                KONTAK KAMI
              </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 text-lg">Kami siap membantu Anda</p>
          <div className="w-24 h-1 mx-auto rounded-full mt-4 bg-blue-500"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
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
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
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
