'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-br from-primary-500 to-primary-600 text-white p-4 rounded-full shadow-2xl hover:shadow-primary-500/50 hover:scale-110 transition-all duration-300 z-50"
          style={{ backgroundColor: '#00b7b5' }}
        >
          <i className="fas fa-arrow-up text-xl"></i>
        </button>
      )}
    </>
  );
}
