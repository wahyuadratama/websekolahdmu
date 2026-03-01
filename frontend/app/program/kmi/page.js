import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Program KMI - Pondok Pesantren Modern Darul Mukhlisin',
  description: 'Kulliyatul Muallimin Al-Islamiyah (KMI) - Program pendidikan berkiblat Gontor',
};

export default function KMIPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white/20 px-4 py-2 rounded-full mb-4">
                <span className="text-sm font-semibold">📚 Program Unggulan</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Kulliyatul Muallimin Al-Islamiyah (KMI)
              </h1>
              <p className="text-xl text-blue-100">
                Program pendidikan berkiblat Pondok Modern Gontor dengan sistem pembelajaran terpadu
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            {/* Tentang KMI */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Tentang Program KMI</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kulliyatul Muallimin Al-Islamiyah (KMI) adalah program pendidikan yang mengadopsi sistem pembelajaran dari Pondok Modern Gontor. Program ini dirancang untuk mencetak kader-kader muslim yang memiliki kedalaman ilmu agama dan penguasaan bahasa Arab serta Inggris.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Dengan masa pendidikan 6 tahun, santri akan mendapatkan pendidikan yang komprehensif meliputi ilmu agama, bahasa, sains, dan keterampilan hidup.
              </p>
            </div>

            {/* Kurikulum */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Kurikulum Pembelajaran</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Ilmu Agama</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Tafsir Al-Quran</li>
                    <li>• Hadits & Musthalah Hadits</li>
                    <li>• Fiqih & Ushul Fiqih</li>
                    <li>• Tauhid & Akhlak</li>
                    <li>• Tarikh Islam</li>
                  </ul>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Bahasa</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Bahasa Arab (Nahwu, Sharaf, Balaghah)</li>
                    <li>• Bahasa Inggris (Grammar, Conversation)</li>
                    <li>• Bahasa Indonesia</li>
                    <li>• Muhadatsah & Muhadarah</li>
                    <li>• Insya' & Kitabah</li>
                  </ul>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Sains & Umum</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Matematika</li>
                    <li>• Fisika & Kimia</li>
                    <li>• Biologi</li>
                    <li>• Sejarah & Geografi</li>
                    <li>• Komputer</li>
                  </ul>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Keterampilan</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Khitabah (Pidato)</li>
                    <li>• Jurnalistik</li>
                    <li>• Kepemimpinan</li>
                    <li>• Organisasi</li>
                    <li>• Kewirausahaan</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Jenjang Pendidikan */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Jenjang Pendidikan</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1-2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Kelas I'dad (Persiapan)</h4>
                    <p className="text-gray-700">Penguatan dasar bahasa Arab, Inggris, dan ilmu agama dasar</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3-4
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Kelas Wustho (Menengah)</h4>
                    <p className="text-gray-700">Pendalaman ilmu agama, bahasa, dan sains tingkat menengah</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    5-6
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Kelas Ulya (Tinggi)</h4>
                    <p className="text-gray-700">Spesialisasi dan persiapan menjadi kader da'i dan pendidik</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Keunggulan */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Keunggulan Program KMI</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Dwi Bahasa</h4>
                    <p className="text-blue-100">Penguasaan Bahasa Arab & Inggris aktif</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Kurikulum Terpadu</h4>
                    <p className="text-blue-100">Integrasi ilmu agama dan umum</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Pembinaan 24 Jam</h4>
                    <p className="text-blue-100">Asrama dengan pengawasan intensif</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Kader Pemimpin</h4>
                    <p className="text-blue-100">Pembentukan karakter kepemimpinan</p>
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
