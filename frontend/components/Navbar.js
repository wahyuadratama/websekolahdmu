'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_SITE_SETTINGS, getSiteSettings, resolveSiteImage } from '@/lib/siteSettings';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [pinnedDropdown, setPinnedDropdown] = useState(null); // dropdown dibuka via klik -> tetap terbuka
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);
  const navRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    getSiteSettings().then((s) => { if (!cancelled) setSettings(s); });
    return () => { cancelled = true; };
  }, []);

  // Klik di luar navbar menutup dropdown yang di-pin
  useEffect(() => {
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setPinnedDropdown(null);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setPinnedDropdown(null);
  };

  const { identity, navigation } = settings;
  const logoSrc = resolveSiteImage(identity.logoUrl, '/images/LOGO DMU.png');
  const navItems = (navigation || []).filter((item) => item.visible !== false);

  const renderLink = (item, isMobile = false) => {
    const hasChildren = Array.isArray(item.children) && item.children.filter((c) => c.visible !== false).length > 0;
    if (!hasChildren) {
      const cls = isMobile ? 'mobile-link' : 'nav-link text-slate-700 hover:text-primary-500';
      const isAnchor = item.url.startsWith('/#') || item.url.startsWith('#');
      return isAnchor ? (
        <a key={item.label} href={item.url} className={cls} onClick={isMobile ? closeMenus : undefined}>{item.label}</a>
      ) : (
        <Link key={item.label} href={item.url || '/'} className={cls} onClick={isMobile ? closeMenus : undefined}>{item.label}</Link>
      );
    }
    // Item dengan submenu (dropdown)
    const key = `nav-${item.label}`;
    const children = item.children.filter((c) => c.visible !== false);
    if (isMobile) {
      const open = openDropdown === key;
      return (
        <div key={item.label} className="rounded-lg border border-slate-200 px-3 py-2">
          <button
            onClick={() => setOpenDropdown(open ? null : key)}
            className="flex w-full items-center justify-between text-left font-medium text-slate-700"
          >
            {item.label}
            <i className={`fas fa-chevron-down text-xs transition-transform ${open ? 'rotate-180' : ''}`}></i>
          </button>
          {open && children.map((child) => (
            <a
              key={child.label}
              href={child.url}
              target={child.url.startsWith('http') ? '_blank' : undefined}
              rel={child.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="mt-2 block rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700"
              onClick={closeMenus}
            >
              <i className="fas fa-users mr-2"></i>{child.label}
            </a>
          ))}
        </div>
      );
    }
    return (
      <div
        key={item.label}
        className="relative"
        onMouseEnter={() => setOpenDropdown(key)}
        onMouseLeave={() => { if (pinnedDropdown !== key) setOpenDropdown(null); }}
      >
        <button
          className="nav-link flex items-center gap-1 text-slate-700 hover:text-primary-500"
          aria-expanded={openDropdown === key}
          aria-haspopup="true"
          onClick={() => {
            if (pinnedDropdown === key) {
              setPinnedDropdown(null);
              setOpenDropdown(null);
            } else {
              setPinnedDropdown(key);
              setOpenDropdown(key);
            }
          }}
        >
          {item.label} <i className={`fas fa-chevron-down text-[10px] transition-transform ${openDropdown === key ? 'rotate-180' : ''}`}></i>
        </button>
        {openDropdown === key && (
          <div className="absolute right-0 top-full w-44 pt-2">
            <div className="rounded-xl border border-slate-100 bg-white py-2 shadow-xl">
            {children.map((child) => (
              <a
                key={child.label}
                href={child.url}
                target={child.url.startsWith('http') ? '_blank' : undefined}
                rel={child.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-primary-500"
                onClick={closeMenus}
              >
                <i className="fas fa-users mr-2"></i>{child.label}
              </a>
            ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav ref={navRef} className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 lg:py-4">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Image src={logoSrc} alt={`Logo ${identity.siteName}`} width={44} height={44} className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12" />
            <div className="min-w-0">
              <span
                className="line-clamp-1 block text-[15px] font-bold leading-tight sm:text-base lg:text-xl"
                style={{
                  fontFamily: "'Aref Ruqaa', 'Traditional Arabic', serif",
                  direction: 'rtl',
                  letterSpacing: '0.3px',
                  color: 'var(--primary)'
                }}
              >
                {identity.siteNameArabic}
              </span>
              <span className="line-clamp-2 text-[10px] font-medium text-slate-700 sm:line-clamp-1 sm:text-xs lg:text-sm">
                {identity.siteName}
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => renderLink(item, false))}
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
          <div className="mx-auto w-full max-w-7xl max-h-[calc(100vh-72px)] overflow-y-auto px-4 py-3 sm:px-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>{renderLink(item, true)}</li>
              ))}
            </ul>
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
          display: flex;
          width: 100%;
          align-items: center;
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
