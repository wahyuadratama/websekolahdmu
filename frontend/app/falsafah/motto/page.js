import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Motto - Pondok Pesantren Modern Darul Mukhlisin',
  description: 'Motto pendidikan Pondok Pesantren Modern Darul Mukhlisin sebagai arah pembentukan karakter santri.'
};

const mottoItems = [
  {
    title: 'Berbudi Tinggi',
    content:
      'Akhlak mulia adalah fondasi utama. Setiap unsur pendidikan diarahkan untuk menumbuhkan adab, sopan santun, kejujuran, dan sikap hormat kepada Allah, guru, orang tua, serta sesama.'
  },
  {
    title: 'Berbadan Sehat',
    content:
      'Kesehatan jasmani dipandang sebagai bagian penting dari ibadah dan perjuangan hidup. Santri dibiasakan menjaga kebugaran melalui pola hidup disiplin, olahraga, kebersihan, dan manajemen aktivitas harian.'
  },
  {
    title: 'Berpengetahuan Luas',
    content:
      'Santri tidak hanya belajar isi ilmu, tetapi juga cara belajar sepanjang hayat. Wawasan keislaman, kebahasaan, sosial, dan akademik dikembangkan agar santri mampu membaca zaman dengan bijak.'
  },
  {
    title: 'Berpikiran Bebas',
    content:
      'Kebebasan berpikir dimaknai sebagai kematangan intelektual: terbuka, kritis, dan objektif, namun tetap terikat pada nilai Islam. Bebas bukan liberal tanpa batas, melainkan merdeka yang berprinsip.'
  }
];

export default function MottoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20 min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-10 sm:py-12 md:py-16">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-blue-100">Falsafah Pondok</p>
            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold">Motto Pendidikan</h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-blue-100">
              Arah pembentukan pribadi santri di Pondok Pesantren Modern Darul Mukhlisin.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {mottoItems.map((item) => (
              <article key={item.title} className="rounded-2xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm">
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
