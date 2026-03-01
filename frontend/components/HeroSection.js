'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { API_URL } from '@/lib/config';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Default fallback images
    const fallbackImages = [
      `${API_URL}/uploads/masjid.JPG`,
      `${API_URL}/uploads/poto 1.jpg`,
      `${API_URL}/uploads/poto 2.jpg`,
      `${API_URL}/uploads/poto 3.jpg`,
      `${API_URL}/uploads/poto 4.jpg`,
    ];

    // Fetch galeri images from API
    fetch(`${API_URL}/api/galeri`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const heroImages = data.data.slice(0, 5).map(item => `${API_URL}${item.url}`);
          setImages(heroImages);
        } else {
          setImages(fallbackImages);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading images:', err);
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

  if (loading) {
    return (
      <section
        id="home"
        className="pt-20 text-white relative overflow-hidden min-h-screen flex items-center"
        style={{
          background: `linear-gradient(135deg, rgba(0, 183, 181, 0.9), rgba(0, 150, 148, 0.95)), url(${API_URL}/uploads/masjid.JPG) center/cover no-repeat fixed`,
        }}
      >
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4">Memuat...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="pt-20 text-white relative overflow-hidden min-h-screen flex items-center"
      style={{
        background: `linear-gradient(135deg, rgba(0, 183, 181, 0.9), rgba(0, 150, 148, 0.95)), url(${API_URL}/uploads/masjid.JPG) center/cover no-repeat fixed`,
      }}
    >
      <div className="absolute top-20 right-10 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up space-y-6">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-semibold">🎓 Pesantren Modern Terpercaya</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Selamat Datang di Pondok Pesantren Modern Darul Mukhlisin
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90">
              Membangun Generasi Unggul dengan Pendidikan Berkualitas dan
              Karakter Islami
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#profil"
                className="bg-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-center shadow-xl"
                style={{ color: 'var(--primary)' }}
              >
                <i className="fas fa-info-circle mr-2"></i>Tentang Kami
              </a>
              <a
                href="#pendaftaran"
                className="border-2 border-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold hover:bg-white hover:scale-105 transition-all duration-300 text-center shadow-xl"
                style={{ color: 'white' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              >
                <i className="fas fa-user-plus mr-2"></i>Daftar Sekarang
              </a>
            </div>
          </div>
          
          {/* Galeri Slider */}
          <div className="relative mt-8 md:mt-0">
            <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Kegiatan Pesantren ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full flex items-center justify-center transition-all"
                aria-label="Previous slide"
              >
                <i className="fas fa-chevron-left text-white text-lg md:text-xl"></i>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full flex items-center justify-center transition-all"
                aria-label="Next slide"
              >
                <i className="fas fa-chevron-right text-white text-lg md:text-xl"></i>
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-6 md:w-8' : 'bg-white/50'
                    }`}
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
