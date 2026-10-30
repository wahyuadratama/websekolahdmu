'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { DEFAULT_SITE_SETTINGS, getSiteSettings, resolveSiteImage } from '@/lib/siteSettings';

export default function Footer() {
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    let cancelled = false;
    getSiteSettings().then((s) => { if (!cancelled) setSettings(s); });
    return () => { cancelled = true; };
  }, []);

  const { identity, social } = settings;
  const logoSrc = resolveSiteImage(identity.logoUrl, '/images/LOGO DMU.png');

  const socialLinks = [
    { key: 'facebook', icon: 'fab fa-facebook-f', label: 'Facebook' },
    { key: 'instagram', icon: 'fab fa-instagram', label: 'Instagram' },
    { key: 'youtube', icon: 'fab fa-youtube', label: 'YouTube' },
    { key: 'whatsapp', icon: 'fab fa-whatsapp', label: 'WhatsApp', isWa: true },
  ].filter((s) => social[s.key]);

  return (
    <footer className="relative overflow-hidden mt-8 text-slate-100">
      <div className="absolute inset-0 bg-slate-900" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white grid place-items-center">
                <Image
                  src={logoSrc}
                  alt="Logo"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
              <h3 className="text-base font-semibold leading-snug">
                {identity.siteName}
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              {identity.tagline}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold tracking-wide">
              Navigasi
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="/#profil" className="hover:text-white transition">
                  Profil
                </a>
              </li>
              <li>
                <a href="/berita" className="hover:text-white transition">
                  Berita
                </a>
              </li>
              <li>
                <a href="/#galeri" className="hover:text-white transition">
                  Galeri
                </a>
              </li>
              <li>
                <a href="/#kontak" className="hover:text-white transition">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold tracking-wide">
              Program Unggulan
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>Penguasaan Bahasa Arab & Inggris</li>
              <li>Tahfidz & Tahsin</li>
              <li>Pramuka & Kepemimpinan</li>
              <li>Literasi Teknologi</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold tracking-wide">
              Terhubung
            </h3>
            <div className="flex gap-3 text-lg">
              {socialLinks.map((s) => {
                const href = s.isWa ? `https://wa.me/${social[s.key]}` : social[s.key];
                return (
                  <a
                    key={s.key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 transition hover:bg-white/20 hover:-translate-y-0.5"
                  >
                    <i className={s.icon}></i>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-center text-sm text-slate-300 md:flex-row md:text-left">
          <p>
            {identity.footerText}
          </p>
          <p className="text-slate-400">
            Designed for a modern, professional digital presence.
          </p>
        </div>
      </div>
    </footer>
  );
}
