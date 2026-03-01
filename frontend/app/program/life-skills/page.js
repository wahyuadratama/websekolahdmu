import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Program Life Skills - Pondok Pesantren Modern Darul Mukhlisin',
  description: 'Program keterampilan hidup: Pertanian, Wirausaha, dan Teknologi',
};

export default function LifeSkillsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-amber-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white/20 px-4 py-2 rounded-full mb-4">
                <span className="text-sm font-semibold">🌱 Program Unggulan</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Program Life Skills
              </h1>
              <p className="text-xl text-orange-100">
                Membekali santri dengan keterampilan hidup praktis untuk kemandirian dan kewirausahaan
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            {/* Tentang Program */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Tentang Program Life Skills</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Program Life Skills adalah program keterampilan hidup yang dirancang untuk membekali santri dengan kemampuan praktis yang dapat digunakan untuk kemandirian ekonomi dan pengembangan diri. Program ini mengintegrasikan nilai-nilai Islam dengan keterampilan modern.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Santri akan belajar berbagai keterampilan mulai dari pertanian, kewirausahaan, hingga teknologi informasi yang dapat menjadi bekal hidup di masa depan.
              </p>
            </div>

            {/* Bidang Keterampilan */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-seedling text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Pertanian & Peternakan</h3>
                <p className="text-gray-700 text-center text-sm">
                  Keterampilan bercocok tanam dan beternak modern
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-store text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Kewirausahaan</h3>
                <p className="text-gray-700 text-center text-sm">
                  Bisnis, marketing, dan manajemen usaha
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-laptop-code text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Teknologi & Digital</h3>
                <p className="text-gray-700 text-center text-sm">
                  Komputer, desain grafis, dan media digital
                </p>
              </div>
            </div>

            {/* Detail Program */}
            <div className="space-y-8">
              {/* Pertanian */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-seedling text-xl text-white"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Pertanian & Peternakan</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">Pertanian Modern</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Hidroponik & Aquaponik</li>
                      <li>• Budidaya Sayuran Organik</li>
                      <li>• Tanaman Obat (TOGA)</li>
                      <li>• Kompos & Pupuk Organik</li>
                      <li>• Greenhouse Management</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">Peternakan</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Budidaya Ikan (Lele, Nila, Gurame)</li>
                      <li>• Ternak Ayam Kampung</li>
                      <li>• Ternak Kambing</li>
                      <li>• Budidaya Lebah Madu</li>
                      <li>• Manajemen Pakan Ternak</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Kewirausahaan */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-store text-xl text-white"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Kewirausahaan</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">Bisnis & Manajemen</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Dasar-dasar Kewirausahaan</li>
                      <li>• Business Plan & Proposal</li>
                      <li>• Manajemen Keuangan</li>
                      <li>• Marketing & Branding</li>
                      <li>• Customer Service</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">Praktik Usaha</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Kantin & Koperasi Pesantren</li>
                      <li>• Produksi Makanan & Minuman</li>
                      <li>• Kerajinan Tangan</li>
                      <li>• Laundry & Jasa</li>
                      <li>• Online Shop & E-commerce</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Teknologi */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-laptop-code text-xl text-white"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Teknologi & Digital</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">Komputer & IT</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Microsoft Office (Word, Excel, PPT)</li>
                      <li>• Desain Grafis (Photoshop, Canva)</li>
                      <li>• Video Editing</li>
                      <li>• Web Design Dasar</li>
                      <li>• Troubleshooting Komputer</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">Media Digital</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Social Media Management</li>
                      <li>• Content Creation</li>
                      <li>• Fotografi & Videografi</li>
                      <li>• Digital Marketing</li>
                      <li>• Podcast & Broadcasting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Jadwal & Sistem */}
            <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Sistem Pembelajaran</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-orange-50 rounded-xl">
                  <div className="text-4xl font-bold text-orange-600 mb-2">30%</div>
                  <h4 className="font-bold text-gray-800 mb-2">Teori</h4>
                  <p className="text-sm text-gray-700">Pembelajaran konsep dan dasar-dasar</p>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-4xl font-bold text-blue-600 mb-2">50%</div>
                  <h4 className="font-bold text-gray-800 mb-2">Praktik</h4>
                  <p className="text-sm text-gray-700">Langsung terjun ke lapangan</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-4xl font-bold text-green-600 mb-2">20%</div>
                  <h4 className="font-bold text-gray-800 mb-2">Proyek</h4>
                  <p className="text-sm text-gray-700">Membuat usaha mandiri</p>
                </div>
              </div>
            </div>

            {/* Keunggulan */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-700 rounded-xl shadow-lg p-8 mt-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Keunggulan Program</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Praktik Langsung</h4>
                    <p className="text-orange-100">Learning by doing dengan fasilitas lengkap</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Mentor Berpengalaman</h4>
                    <p className="text-orange-100">Dibimbing praktisi dan entrepreneur</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Sertifikat Kompetensi</h4>
                    <p className="text-orange-100">Sertifikat untuk setiap keterampilan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Inkubasi Bisnis</h4>
                    <p className="text-orange-100">Pendampingan memulai usaha</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
