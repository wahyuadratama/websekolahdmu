'use client';

import Image from 'next/image';
import Link from 'next/link';
import { API_URL } from '@/lib/config';

export default function ProfilSection() {
  const leaders = [
    {
      name: 'H. Mukhlis Patahna, S.H., M.Kn.',
      role: 'Pendiri Pondok',
      note: 'Yayasan Darul Mukhlisin',
      image: `${API_URL}/uploads/poto 2.jpg`,
    },
    {
      name: 'Hj. Diana Dewi Satria, S.Sos.',
      role: 'Ketua Yayasan',
      note: 'Yayasan Darul Mukhlisin',
      image: `${API_URL}/uploads/poto 3.jpg`,
    },
    {
      name: 'Al-Ustadz Dwi Saputro, S.PdI.',
      role: 'Pimpinan Pondok',
      note: 'Periode 2018 - sekarang',
      image: `${API_URL}/uploads/poto 4 new.jpg`,
    },
  ];

  const programs = [
    {
      title: 'Program KMI',
      desc: 'Kulliyatul Muallimin Al-Islamiyah berkiblat Gontor',
      href: '/program/kmi',
      icon: 'fas fa-graduation-cap',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: "Ihya Al-Qur'an",
      desc: 'Tahsin dan tahfidz Al-Quran terpadu',
      href: '/program/ihya-alquran',
      icon: 'fas fa-quran',
      gradient: 'from-green-500 to-green-600',
    },
    {
      title: 'Life Skills',
      desc: 'Pertanian, wirausaha, dan teknologi',
      href: '/program/life-skills',
      icon: 'fas fa-tools',
      gradient: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section id="profil" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 space-y-20 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-2">
            <i className="fas fa-mosque mr-2"></i>Tentang Kami
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Profil Pesantren</h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            Pondok Pesantren Modern Darul Mukhlisin menyeimbangkan akhlak, ilmu, dan keterampilan dengan pendampingan yang dekat.
          </p>
        </div>

        {/* Struktur Kepemimpinan */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-bold text-gray-900">Struktur Kepemimpinan</h3>
            <p className="text-gray-600">Yayasan dan pimpinan yang aktif membina santri</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {leaders.map((item, index) => (
              <div 
                key={item.name} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                      <Image src={item.image} alt={item.role} width={128} height={128} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    {item.role}
                  </div>
                  <div className="text-xl font-bold text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <i className="fas fa-building text-primary-600"></i>
                    {item.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sejarah Singkat */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-4">
              <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-2">
                <i className="fas fa-history mr-2"></i>Sejarah
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Sejarah Singkat</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Pesantren modern dengan akar tradisi, berdiri untuk menjawab tantangan zaman dan mempersiapkan generasi berakhlak, berilmu, dan siap mengabdi.
              </p>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Sistem pesantren di Indonesia menjadi alternatif pendidikan yang melahirkan perubahan sosial. Dengan memadukan tradisi salaf dan pendekatan modern, Darul Mukhlisin hadir untuk membina santri di era global.
              </p>
              <p>
                Didirikan oleh H. Mukhlis Patahna, S.H., M.Kn. dan Hj. Diana Dewi Satria, S.Sos., pesantren ini merupakan wujud bakti dan cinta kepada Allah dalam membangun generasi Islami.
              </p>
            </div>
          </div>
        </div>

        {/* Program Unggulan */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-bold text-gray-900">Program Unggulan</h3>
            <p className="text-gray-600">Tiga pilar utama pendidikan</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((item) => (
              <div 
                key={item.title} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <i className={`${item.icon} text-white text-2xl`}></i>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  <Link 
                    href={item.href} 
                    className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800 group-hover:gap-3 transition-all"
                  >
                    Selengkapnya <i className="fas fa-arrow-right text-sm"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 md:p-10 text-white shadow-xl">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <i className="fas fa-eye text-3xl"></i>
              </div>
              <h3 className="text-3xl font-bold">Visi</h3>
              <p className="leading-relaxed text-white/95 text-lg">
                Menjadi pesantren modern yang unggul, melahirkan pemimpin berkarakter Islami, berintegritas, dan bertanggung jawab untuk kemaslahatan masyarakat.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                <i className="fas fa-bullseye text-white text-3xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Misi</h3>
              <ul className="space-y-3 text-gray-700 leading-relaxed">
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-primary-600 mt-1 flex-shrink-0"></i>
                  <span>Pendidikan terpadu diniyah, umum, dan life skills.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-primary-600 mt-1 flex-shrink-0"></i>
                  <span>Menanamkan akhlak, kepemimpinan, dan kedisiplinan.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-primary-600 mt-1 flex-shrink-0"></i>
                  <span>Menguatkan tahfidz serta bahasa Arab dan Inggris.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-primary-600 mt-1 flex-shrink-0"></i>
                  <span>Berkolaborasi dengan orang tua dan masyarakat.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
