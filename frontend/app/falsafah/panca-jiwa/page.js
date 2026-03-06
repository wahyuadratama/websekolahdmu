import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Panca Jiwa - Pondok Pesantren Modern Darul Mukhlisin',
  description: 'Penjelasan Panca Jiwa sebagai nilai dasar kehidupan dan pendidikan di Pondok Pesantren Modern Darul Mukhlisin.'
};

const jiwaItems = [
  {
    title: 'Jiwa Keikhlasan',
    content:
      'Semua amal pendidikan dijalankan karena Allah, bukan untuk mencari keuntungan pribadi. Pengasuh, guru, dan santri sama-sama menumbuhkan niat ibadah, sehingga suasana belajar menjadi tulus, hangat, dan penuh hormat.'
  },
  {
    title: 'Jiwa Kesederhanaan',
    content:
      'Kesederhanaan bukan berarti lemah atau pasrah. Nilai ini melatih ketahanan mental, pengendalian diri, dan keberanian hidup. Dari kesederhanaan lahir pribadi yang kuat, tidak manja, dan siap menghadapi tantangan.'
  },
  {
    title: 'Jiwa Berdikari',
    content:
      'Santri dibiasakan mengurus kebutuhannya sendiri, disiplin, serta bertanggung jawab. Pondok juga terus menata kemandirian lembaga agar mampu berdiri dengan kekuatan internal, sambil tetap terbuka pada dukungan yang sehat dan membangun.'
  },
  {
    title: 'Jiwa Ukhuwah Islamiyah',
    content:
      'Kehidupan asrama dibangun di atas persaudaraan: suka dan duka dirasakan bersama. Kebersamaan ini tidak berhenti di dalam pondok, tetapi menjadi bekal membangun persatuan umat saat santri terjun ke masyarakat.'
  },
  {
    title: 'Jiwa Bebas (Bertanggung Jawab)',
    content:
      'Santri dididik agar merdeka berpikir, berani menentukan masa depan, dan tidak mudah terbawa pengaruh negatif. Kebebasan dijalankan dalam batas nilai Islam, adab, dan tanggung jawab; bukan kebebasan tanpa arah.'
  }
];

export default function PancaJiwaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20 min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white py-10 sm:py-12 md:py-16">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-emerald-100">Falsafah Pondok</p>
            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold">Panca Jiwa</h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-emerald-100">
              Lima nilai utama yang menjiwai pendidikan Pondok Pesantren Modern Darul Mukhlisin.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="space-y-4 sm:space-y-5">
            {jiwaItems.map((item, idx) => (
              <article key={item.title} className="rounded-2xl border border-emerald-100 bg-white p-5 sm:p-6 shadow-sm">
                <div className="mb-2 text-xs sm:text-sm font-semibold text-emerald-700">0{idx + 1}</div>
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
