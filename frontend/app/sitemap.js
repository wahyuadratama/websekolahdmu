export default function sitemap() {
  const base = 'https://darulmukhlisin.ponpes.id';
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/berita`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/galeri`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/falsafah/panca-jiwa`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/falsafah/motto`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/falsafah/panca-jangka`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/program/kmi`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/program/ihya-alquran`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/program/life-skills`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];
}
