'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DEFAULT_SITE_SETTINGS, getSiteSettings } from '@/lib/siteSettings';

const PREFILL_TEXT = "Assalamu'alaikum, saya ingin bertanya tentang PPDB Pondok Pesantren Modern Darul Mukhlisin";

export default function WaFloatButton() {
  const pathname = usePathname();
  const [waNumber, setWaNumber] = useState(DEFAULT_SITE_SETTINGS.social.whatsapp);

  useEffect(() => {
    let cancelled = false;
    getSiteSettings().then((s) => {
      if (!cancelled && s?.social?.whatsapp) setWaNumber(s.social.whatsapp);
    });
    return () => { cancelled = true; };
  }, []);

  // Sembunyikan di area admin & login
  if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/login'))) {
    return null;
  }

  const href = `https://wa.me/${waNumber}?text=${encodeURIComponent(PREFILL_TEXT)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      title="Chat WhatsApp"
      className="hidden md:grid fixed bottom-6 right-6 z-40 h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-600/30 transition-transform duration-200 hover:scale-110"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" aria-hidden="true"></span>
      <i className="fab fa-whatsapp text-3xl relative" aria-hidden="true"></i>
    </a>
  );
}
