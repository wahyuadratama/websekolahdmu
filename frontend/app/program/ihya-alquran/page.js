import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Program Ihya Al-Quran - Pondok Pesantren Modern Darul Mukhlisin',
  description: 'Program Tahsin dan Tahfidz Al-Quran dengan metode terpadu',
};

export default function IhyaAlquranPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white/20 px-4 py-2 rounded-full mb-4">
                <span className="text-sm font-semibold">📖 Program Unggulan</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Program Ihya Al-Quran
              </h1>
              <p className="text-xl text-green-100">
                Tahsin dan Tahfidz Al-Quran dengan metode pembelajaran yang efektif dan menyenangkan
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            {/* Tentang Program */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Tentang Program Ihya Al-Quran</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Program Ihya Al-Quran adalah program khusus yang fokus pada pembinaan bacaan Al-Quran (Tahsin) dan hafalan Al-Quran (Tahfidz). Program ini dirancang untuk menghidupkan kembali semangat generasi Qur'ani yang mencintai dan mengamalkan Al-Quran.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Dengan metode pembelajaran yang sistematis dan pembimbing yang berpengalaman, santri akan dibimbing untuk dapat membaca Al-Quran dengan tartil dan menghafal Al-Quran dengan mudah.
              </p>
            </div>

            {/* Tahapan Program */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Tahapan Program</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">1. Tahsin (Perbaikan Bacaan)</h3>
                  <p className="text-gray-700 mb-3">Memperbaiki dan memperindah bacaan Al-Quran sesuai kaidah tajwid</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Makharijul Huruf (Tempat keluar huruf)</li>
                    <li>• Sifatul Huruf (Sifat-sifat huruf)</li>
                    <li>• Ahkamul Huruf (Hukum-hukum huruf)</li>
                    <li>• Ahkamul Mad (Hukum panjang pendek)</li>
                    <li>• Ahkamul Waqaf wal Ibtida (Hukum berhenti dan memulai)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">2. Tahfidz (Menghafal Al-Quran)</h3>
                  <p className="text-gray-700 mb-3">Program menghafal Al-Quran dengan target bertahap</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Target Juz 30</h4>
                      <p className="text-sm text-gray-700">Hafalan Juz Amma untuk pemula</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Target 5 Juz</h4>
                      <p className="text-sm text-gray-700">Hafalan 5 Juz untuk tingkat menengah</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Target 10 Juz</h4>
                      <p className="text-sm text-gray-700">Hafalan 10 Juz untuk tingkat lanjut</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Target 30 Juz</h4>
                      <p className="text-sm text-gray-700">Hafalan 30 Juz (Hafidz/Hafidzah)</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">3. Tilawah (Seni Baca Al-Quran)</h3>
                  <p className="text-gray-700 mb-3">Pembelajaran seni membaca Al-Quran dengan lagu (nagham)</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Maqam Bayati</li>
                    <li>• Maqam Shoba</li>
                    <li>• Maqam Nahawand</li>
                    <li>• Maqam Hijaz</li>
                    <li>• Maqam Rast</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Metode Pembelajaran */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Metode Pembelajaran</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-user-friends text-2xl text-white"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Talaqqi</h4>
                  <p className="text-sm text-gray-700">Belajar langsung dengan guru secara tatap muka</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-users text-2xl text-white"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Halaqah</h4>
                  <p className="text-sm text-gray-700">Belajar dalam kelompok kecil dengan bimbingan guru</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-sync text-2xl text-white"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Muraja'ah</h4>
                  <p className="text-sm text-gray-700">Mengulang hafalan secara rutin dan terjadwal</p>
                </div>
              </div>
            </div>

            {/* Jadwal Kegiatan */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Jadwal Kegiatan Harian</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-24 font-bold text-green-600">04:30</div>
                  <div className="flex-1">Tahajjud & Tilawah Pagi</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-24 font-bold text-green-600">05:30</div>
                  <div className="flex-1">Setoran Hafalan Baru</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-24 font-bold text-green-600">15:30</div>
                  <div className="flex-1">Tahsin & Talaqqi</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-24 font-bold text-green-600">19:30</div>
                  <div className="flex-1">Muraja'ah Hafalan</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-24 font-bold text-green-600">20:30</div>
                  <div className="flex-1">Tilawah Malam & Evaluasi</div>
                </div>
              </div>
            </div>

            {/* Keunggulan */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl shadow-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Keunggulan Program</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Guru Bersanad</h4>
                    <p className="text-green-100">Pembimbing yang memiliki sanad Al-Quran</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Metode Terbukti</h4>
                    <p className="text-green-100">Metode pembelajaran yang efektif</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Evaluasi Berkala</h4>
                    <p className="text-green-100">Monitoring progress hafalan rutin</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Sertifikat Resmi</h4>
                    <p className="text-green-100">Sertifikat untuk setiap pencapaian</p>
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
