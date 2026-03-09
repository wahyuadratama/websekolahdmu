'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { API_BASE } from '@/lib/config';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function CountUp({ value, started, duration = 1200, instant = false }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!started) return;

    const target = Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;

    if (instant) {
      setDisplay(Math.round(target));
      return;
    }

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(Math.round(target));
      return;
    }

    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);
      setDisplay(Math.round(target * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, started, duration, instant]);

  return <>{display.toLocaleString('id-ID')}</>;
}

export default function StatsSection() {
  const [stats, setStats] = useState({ siswa: 1200, pendaftar: 0, guru: 85, keahlian: 15, prestasi: 50 });
  const [animated, setAnimated] = useState(false);
  const [countStarted, setCountStarted] = useState(false);
  const [playedInSession, setPlayedInSession] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setAnimated(true);

    fetch(`${API_BASE}/settings/stats`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setStats(data.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching stats:', err);
      });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = window.sessionStorage.getItem('dmu_stats_count_seen') === '1';
    if (seen) {
      setPlayedInSession(true);
      setCountStarted(true);
      return;
    }

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountStarted(true);
          window.sessionStorage.setItem('dmu_stats_count_seen', '1');
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const items = useMemo(
    () => [
      { label: 'Santri Aktif', value: stats.siswa, icon: 'fas fa-users' },
      { label: 'Pendaftar Baru', value: stats.pendaftar, icon: 'fas fa-user-plus' },
      { label: 'Asatidz/Asatidzah', value: stats.guru, icon: 'fas fa-chalkboard-teacher' },
      { label: 'Program Unggulan', value: stats.keahlian, icon: 'fas fa-book' },
      { label: 'Prestasi', value: stats.prestasi, icon: 'fas fa-trophy' },
    ],
    [stats]
  );

  return (
    <section id="stats-section" ref={sectionRef} className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-8 xl:grid-cols-5 xl:gap-12">
            {items.map((item, index) => (
              <div
                key={item.label}
                className={`group rounded-xl border border-slate-100 bg-slate-50/60 p-3 transition-all duration-500 md:rounded-2xl md:p-5 ${
                  animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-1.5 md:space-y-3">
                  <div className="text-primary-600/30 group-hover:text-primary-600/50 transition-colors duration-300">
                    <i className={`${item.icon} text-xl md:text-3xl`}></i>
                  </div>
                  <div className="text-2xl md:text-5xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 tabular-nums">
                    <CountUp value={item.value} started={countStarted} instant={playedInSession} duration={1100 + index * 120} />
                  </div>
                  <div className="text-[10px] md:text-sm font-semibold text-gray-600 uppercase tracking-wide">{item.label}</div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
