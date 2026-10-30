import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-white shadow-md grid place-items-center">
          <Image src="/images/LOGO DMU.png" alt="Logo Darul Mukhlisin" width={48} height={48} className="object-contain" />
        </div>
        <p className="text-7xl font-extrabold text-slate-200 select-none">404</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-800">Halaman Tidak Ditemukan</h1>
        <p className="mt-3 text-slate-600">
          Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700 transition"
          >
            <i className="fas fa-home mr-2"></i>Kembali ke Beranda
          </Link>
          <Link
            href="/berita"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            <i className="fas fa-newspaper mr-2"></i>Lihat Berita
          </Link>
        </div>
        <p className="mt-8 text-sm text-slate-400">Pondok Pesantren Modern Darul Mukhlisin</p>
      </div>
    </main>
  );
}
