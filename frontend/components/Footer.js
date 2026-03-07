import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden mt-8 text-slate-100">
      <div className="absolute inset-0 bg-slate-900" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white grid place-items-center">
                <Image src="/images/LOGO DMU.png" alt="Logo" width={34} height={34} className="object-contain" />
              </div>
              <h3 className="text-base font-semibold leading-snug">Pondok Pesantren Modern Darul Mukhlisin</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              Membangun generasi unggul: beradab, berilmu, dan siap menghadapi tantangan zaman.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold tracking-wide">Navigasi</h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><a href="/#profil" className="hover:text-white transition">Profil</a></li>
              <li><a href="/berita" className="hover:text-white transition">Berita</a></li>
              <li><a href="/#galeri" className="hover:text-white transition">Galeri</a></li>
              <li><a href="/#kontak" className="hover:text-white transition">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold tracking-wide">Program Unggulan</h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>Penguasaan Bahasa Arab & Inggris</li>
              <li>Tahfidz & Tahsin</li>
              <li>Pramuka & Kepemimpinan</li>
              <li>Literasi Teknologi</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold tracking-wide">Terhubung</h3>
            <div className="flex gap-3 text-lg">
              <a href="https://www.facebook.com/darulmukhlisin5715" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 transition hover:bg-white/20 hover:-translate-y-0.5"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/darulmukhlisin.dmu/" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 transition hover:bg-white/20 hover:-translate-y-0.5"><i className="fab fa-instagram"></i></a>
              <a href="https://youtube.com/channel/UC-5X6CUlwlG9J6jJSA8sAIw" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 transition hover:bg-white/20 hover:-translate-y-0.5"><i className="fab fa-youtube"></i></a>
              <a href="https://wa.me/6287825279426" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 transition hover:bg-white/20 hover:-translate-y-0.5"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-center text-sm text-slate-300 md:flex-row md:text-left">
          <p>© 2025 Pondok Pesantren Modern Darul Mukhlisin. All rights reserved.</p>
          <p className="text-slate-400">Designed for a modern, professional digital presence.</p>
        </div>
      </div>
    </footer>
  );
}


