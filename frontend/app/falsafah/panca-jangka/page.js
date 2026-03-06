import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Panca Jangka - Pondok Pesantren Modern Darul Mukhlisin',
  description: 'Panca Jangka sebagai program strategis pengembangan Pondok Pesantren Modern Darul Mukhlisin.'
};

const jangkaItems = [
  {
    title: 'Pendidikan dan Pengajaran',
    content:
      'Pondok berkomitmen meningkatkan mutu kurikulum, metode, dan budaya belajar secara berkelanjutan agar lahir lulusan yang kuat dalam agama, ilmu, adab, dan kepemimpinan.'
  },
  {
    title: 'Kaderisasi',
    content:
      'Keberlanjutan lembaga ditopang oleh penyiapan kader secara sistematis. Santri, guru, dan pengelola dibina agar siap melanjutkan amanah perjuangan pondok lintas generasi.'
  },
  {
    title: 'Pergedungan',
    content:
      'Pengembangan sarana-prasarana dilakukan bertahap sesuai kebutuhan pendidikan: ruang belajar, asrama, fasilitas ibadah, dan sarana penunjang lainnya yang layak serta aman.'
  },
  {
    title: 'Khizanatullah (Pendanaan Mandiri)',
    content:
      'Pondok menata sumber daya finansial yang sehat dan berkelanjutan agar tidak bergantung penuh pada pihak luar. Kemandirian ekonomi menjadi pondasi kokoh bagi keberlangsungan pendidikan.'
  },
  {
    title: 'Kesejahteraan Keluarga Pondok',
    content:
      'Pondok mendorong penguatan kesejahteraan keluarga besar pengabdi pondok agar mereka dapat hidup bermartabat, produktif, dan turut memperkuat kemajuan lembaga.'
  }
];

export default function PancaJangkaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20 min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-amber-600 to-orange-700 text-white py-10 sm:py-12 md:py-16">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-100">Falsafah Pondok</p>
            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold">Panca Jangka</h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-amber-100">
              Lima arah kerja strategis untuk pengembangan Pondok Pesantren Modern Darul Mukhlisin.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="space-y-4 sm:space-y-5">
            {jangkaItems.map((item, idx) => (
              <article key={item.title} className="rounded-2xl border border-amber-100 bg-white p-5 sm:p-6 shadow-sm">
                <div className="mb-2 text-xs sm:text-sm font-semibold text-amber-700">Program {idx + 1}</div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700">{item.content}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
