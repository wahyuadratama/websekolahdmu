'use client';

import { useEffect, useState } from 'react';
import { API_BASE } from '@/lib/config';

export default function StatsSection() {
  const [stats, setStats] = useState({ siswa: 1200, pendaftar: 0, guru: 85, keahlian: 15, prestasi: 50 });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
    
    fetch(`${API_BASE}/settings/stats`)
      .then(res => res.json())
      .then(data => {

        if (data.success && data.data) {
          setStats(data.data);
        }
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        // Keep default values if API fails
      });
  }, []);

  const items = [
    { label: 'Santri Aktif', value: stats.siswa, icon: 'fas fa-users' },
    { label: 'Pendaftar Baru', value: stats.pendaftar, icon: 'fas fa-user-plus' },
    { label: 'Asatidz/Asatidzah', value: stats.guru, icon: 'fas fa-chalkboard-teacher' },
    { label: 'Program Unggulan', value: stats.keahlian, icon: 'fas fa-book' },
    { label: 'Prestasi', value: stats.prestasi, icon: 'fas fa-trophy' },
  ];

  return (
    <section id="stats-section" className="py-12 md:py-16 bg-white relative overflow-hidden">
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
                  <div className="text-2xl md:text-5xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                    {item.value}
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
