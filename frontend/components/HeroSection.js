'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { API_URL } from '@/lib/config';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fallbackImages = [
      `${API_URL}/uploads/masjid.JPG`,
      `${API_URL}/uploads/poto 1.jpg`,
      `${API_URL}/uploads/poto 2.jpg`,
      `${API_URL}/uploads/poto 3.jpg`,
      `${API_URL}/uploads/poto 4.jpg`
    ];

    fetch(`${API_URL}/api/galeri?limit=5`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const heroImages = data.data.slice(0, 5).map((item) => `${API_URL}${item.url}`);
          setImages(heroImages);
        } else {
          setImages(fallbackImages);
        }
        setLoading(false);
      })
      .catch(() => {
        setImages(fallbackImages);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 text-white md:pt-28"
      style={{
        background: `linear-gradient(110deg, rgba(15, 23, 42, 0.72), rgba(30, 64, 175, 0.68)), url(${API_URL}/uploads/masjid.JPG) center/cover no-repeat`
      }}
    >
      <div className="absolute right-8 top-24 h-56 w-56 rounded-full bg-white/10 blur-3xl md:h-72 md:w-72" />
      <div className="absolute bottom-12 left-4 h-64 w-64 rounded-full bg-white/10 blur-3xl md:left-10 md:h-80 md:w-80" />

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-5 text-center lg:text-left">
            <div className="inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
              Website Resmi Pondok Pesantren
            </div>

            <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Selamat Datang di Pondok Pesantren Modern Darul Mukhlisin
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl lg:mx-0 lg:text-xl">
              Membangun generasi berilmu, berakhlak, dan siap menghadapi tantangan zaman melalui pendidikan Islam yang terarah.
            </p>

            <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#profil"
                className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold shadow-xl transition hover:scale-[1.02] hover:bg-slate-100 sm:px-7 sm:py-3.5 sm:text-base"
                style={{ color: 'var(--primary)' }}
              >
                <i className="fas fa-info-circle mr-2"></i>Tentang Kami
              </a>
              <a
                href="#pendaftaran"
                className="rounded-xl border-2 border-white px-5 py-3 text-center text-sm font-bold text-white shadow-xl transition hover:scale-[1.02] hover:bg-white sm:px-7 sm:py-3.5 sm:text-base"
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
              >
                <i className="fas fa-user-plus mr-2"></i>Daftar Sekarang
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[250px] w-full overflow-hidden rounded-2xl shadow-2xl sm:h-[320px] md:h-[420px] lg:h-[500px]">
              {!loading && images.length > 0 ? (
                images.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <Image src={img} alt={`Kegiatan Pesantren ${index + 1}`} fill className="object-cover" priority={index === 0} />
                  </div>
                ))
              ) : (
                <div className="grid h-full place-items-center bg-white/10">
                  <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-white"></div>
                </div>
              )}

              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/30 backdrop-blur-sm transition hover:bg-white/50 sm:left-3 sm:h-11 sm:w-11"
                aria-label="Previous slide"
              >
                <i className="fas fa-chevron-left text-sm text-white sm:text-base"></i>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/30 backdrop-blur-sm transition hover:bg-white/50 sm:right-3 sm:h-11 sm:w-11"
                aria-label="Next slide"
              >
                <i className="fas fa-chevron-right text-sm text-white sm:text-base"></i>
              </button>

              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-6 bg-white sm:w-8' : 'w-2 bg-white/50'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

