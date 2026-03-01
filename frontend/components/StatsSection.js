'use client';

import { useEffect, useState } from 'react';
import { API_BASE } from '@/lib/config';

export default function StatsSection() {
  const [stats, setStats] = useState({ siswa: 1200, guru: 85, keahlian: 15, prestasi: 50 });
  const [pendaftar, setPendaftar] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
    
    fetch(`${API_BASE}/settings/stats`)
      .then(res => res.json())
      .then(data => {
        console.log('Stats data:', data);
        if (data.success && data.data) {
          setStats(data.data);
        }
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        // Keep default values if API fails
      });

    fetch(`${API_BASE}/pendaftaran/count`)
      .then(res => res.json())
      .then(data => {
        console.log('Pendaftar data:', data);
        if (data.success && data.data) {
          setPendaftar(data.data.count);
        }
      })
      .catch(err => {
        console.error('Error fetching pendaftar:', err);
        // Keep default value if API fails
      });
  }, []);

  const items = [
    { label: 'Santri Aktif', value: stats.siswa, icon: 'fas fa-users' },
    { label: 'Pendaftar Baru', value: pendaftar, icon: 'fas fa-user-plus' },
    { label: 'Asatidz/Asatidzah', value: stats.guru, icon: 'fas fa-chalkboard-teacher' },
    { label: 'Program Unggulan', value: stats.keahlian, icon: 'fas fa-book' },
    { label: 'Prestasi', value: stats.prestasi, icon: 'fas fa-trophy' },
  ];

  return (
    <section id="stats-section" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 md:gap-16 md:grid-cols-3 xl:grid-cols-5">
            {items.map((item, index) => (
              <div 
                key={item.label} 
                className={`group transition-all duration-500 ${
                  animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="text-primary-600/20 group-hover:text-primary-600/40 transition-colors duration-300">
                    <i className={`${item.icon} text-3xl`}></i>
                  </div>
                  <div className="text-5xl md:text-6xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                    {item.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600 uppercase tracking-wider">{item.label}</div>
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
