'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alumniDropdownOpen, setAlumniDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/LOGO DMU.png"
              alt="Logo DMU"
              width={48}
              height={48}
              className="object-contain"
            />
            <div className="flex flex-col">
              <span
                className="text-xl md:text-2xl font-bold"
                style={{
                  fontFamily: "'Aref Ruqaa', 'Traditional Arabic', serif",
                  direction: 'rtl',
                  letterSpacing: '0.5px',
                  color: 'var(--primary)'
                }}
              >
                معهد دار المخلصين لتربية الإسلامية الحديثة
              </span>
              <span className="text-xs md:text-sm text-gray-600 font-medium">
                Pondok Pesantren Modern Darul Mukhlisin
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="/#home" className="nav-link text-gray-700 hover:text-primary-500 transition">
              Beranda
            </a>
            <a href="/#profil" className="nav-link text-gray-700 hover:text-primary-500 transition">
              Profil
            </a>
            <a href="/#pendaftaran" className="nav-link text-gray-700 hover:text-primary-500 transition">
              Pendaftaran
            </a>
            <Link href="/berita" className="nav-link text-gray-700 hover:text-primary-500 transition">
              Berita
            </Link>
            <a href="/#galeri" className="nav-link text-gray-700 hover:text-primary-500 transition">
              Galeri
            </a>
            <a href="/#guru" className="nav-link text-gray-700 hover:text-primary-500 transition">
              Guru
            </a>
            <div 
              className="relative"
              onMouseEnter={() => setAlumniDropdownOpen(true)}
              onMouseLeave={() => setAlumniDropdownOpen(false)}
            >
              <button className="nav-link text-gray-700 hover:text-primary-500 transition flex items-center gap-1">
                Alumni
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              {alumniDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                  <a 
                    href="https://wahyuadratama.github.io/website-ikadm/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                    style={{ color: 'inherit' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                  >
                    <i className="fas fa-users mr-2"></i>
                    IKADM
                  </a>
                </div>
              )}
            </div>
            <a href="/#kontak" className="nav-link text-gray-700 hover:text-primary-500 transition">
              Kontak
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 z-50 relative"
            aria-label="Toggle menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2">
            <a 
              href="/#home" 
              className="block py-2 text-gray-700 hover:text-primary-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beranda
            </a>
            <a 
              href="/#profil" 
              className="block py-2 text-gray-700 hover:text-primary-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profil
            </a>
            <a 
              href="/#pendaftaran" 
              className="block py-2 text-gray-700 hover:text-primary-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pendaftaran
            </a>
            <Link 
              href="/berita" 
              className="block py-2 text-gray-700 hover:text-primary-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Berita
            </Link>
            <a 
              href="/#galeri" 
              className="block py-2 text-gray-700 hover:text-primary-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Galeri
            </a>
            <a 
              href="/#guru" 
              className="block py-2 text-gray-700 hover:text-primary-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Guru
            </a>
            <div className="py-2">
              <button 
                onClick={() => setAlumniDropdownOpen(!alumniDropdownOpen)}
                className="w-full text-left text-gray-700 hover:text-primary-500 flex items-center justify-between"
              >
                Alumni
                <i className={`fas fa-chevron-down text-xs transition-transform ${alumniDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {alumniDropdownOpen && (
                <div className="pl-4 mt-2">
                  <a 
                    href="https://wahyuadratama.github.io/website-ikadm/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-gray-600 hover:text-primary-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fas fa-users mr-2"></i>
                    IKADM
                  </a>
                </div>
              )}
            </div>
            <a 
              href="/#kontak" 
              className="block py-2 text-gray-700 hover:text-primary-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontak
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: var(--primary);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}
