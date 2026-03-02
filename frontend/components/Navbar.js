'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alumniDropdownOpen, setAlumniDropdownOpen] = useState(false);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setAlumniDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 lg:py-4">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Image src="/images/LOGO DMU.png" alt="Logo DMU" width={44} height={44} className="shrink-0 object-contain sm:h-12 sm:w-12" />
            <div className="min-w-0">
              <span
                className="line-clamp-1 block text-sm font-bold leading-tight sm:text-base lg:text-xl"
                style={{
                  fontFamily: "'Aref Ruqaa', 'Traditional Arabic', serif",
                  direction: 'rtl',
                  letterSpacing: '0.3px',
                  color: 'var(--primary)'
                }}
              >
                معهد دار المخلصين لتربية الإسلامية الحديثة
              </span>
              <span className="line-clamp-1 text-[10px] font-medium text-slate-600 sm:text-xs lg:text-sm">
                Pondok Pesantren Modern Darul Mukhlisin
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            <a href="/#home" className="nav-link text-slate-700 hover:text-primary-500">Beranda</a>
            <a href="/#profil" className="nav-link text-slate-700 hover:text-primary-500">Profil</a>
            <a href="/#pendaftaran" className="nav-link text-slate-700 hover:text-primary-500">Pendaftaran</a>
            <Link href="/berita" className="nav-link text-slate-700 hover:text-primary-500">Berita</Link>
            <a href="/#galeri" className="nav-link text-slate-700 hover:text-primary-500">Galeri</a>
            <a href="/#guru" className="nav-link text-slate-700 hover:text-primary-500">Guru</a>

            <div className="relative" onMouseEnter={() => setAlumniDropdownOpen(true)} onMouseLeave={() => setAlumniDropdownOpen(false)}>
              <button className="nav-link flex items-center gap-1 text-slate-700 hover:text-primary-500">
                Alumni <i className="fas fa-chevron-down text-[10px]"></i>
              </button>
              {alumniDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-100 bg-white py-2 shadow-xl">
                  <a
                    href="https://wahyuadratama.github.io/website-ikadm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-primary-500"
                  >
                    <i className="fas fa-users mr-2"></i>IKADM
                  </a>
                </div>
              )}
            </div>

            <a href="/#kontak" className="nav-link text-slate-700 hover:text-primary-500">Kontak</a>
          </div>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="mx-auto w-full max-w-7xl space-y-1 px-4 py-3 sm:px-6">
            <a href="/#home" className="mobile-link" onClick={closeMenus}>Beranda</a>
            <a href="/#profil" className="mobile-link" onClick={closeMenus}>Profil</a>
            <a href="/#pendaftaran" className="mobile-link" onClick={closeMenus}>Pendaftaran</a>
            <Link href="/berita" className="mobile-link" onClick={closeMenus}>Berita</Link>
            <a href="/#galeri" className="mobile-link" onClick={closeMenus}>Galeri</a>
            <a href="/#guru" className="mobile-link" onClick={closeMenus}>Guru</a>

            <div className="rounded-lg border border-slate-200 px-3 py-2">
              <button
                onClick={() => setAlumniDropdownOpen((prev) => !prev)}
                className="flex w-full items-center justify-between text-left font-medium text-slate-700"
              >
                Alumni
                <i className={`fas fa-chevron-down text-xs transition-transform ${alumniDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {alumniDropdownOpen && (
                <a
                  href="https://wahyuadratama.github.io/website-ikadm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700"
                  onClick={closeMenus}
                >
                  <i className="fas fa-users mr-2"></i>IKADM
                </a>
              )}
            </div>

            <a href="/#kontak" className="mobile-link" onClick={closeMenus}>Kontak</a>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-link {
          position: relative;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -6px;
          left: 0;
          background-color: var(--primary);
          transition: width 0.25s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .mobile-link {
          display: block;
          border-radius: 0.6rem;
          padding: 0.62rem 0.75rem;
          font-weight: 500;
          color: #334155;
          transition: background 0.2s ease;
        }
        .mobile-link:hover {
          background: #f1f5f9;
          color: var(--primary);
        }
      `}</style>
    </nav>
  );
}
