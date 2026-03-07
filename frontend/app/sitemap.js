import { API_BASE } from '@/lib/config';

export const revalidate = 3600;

async function getPublishedBerita() {
  try {
    const response = await fetch(`${API_BASE}/berita?status=published&limit=1000`, {
      next: { revalidate },
    });

    if (!response.ok) return [];

    const json = await response.json();
    if (!json?.success || !Array.isArray(json?.data)) return [];

    return json.data;
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const base = 'https://darulmukhlisin.ponpes.id';
  const now = new Date();

  const staticRoutes = [
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

  const beritaList = await getPublishedBerita();
  const beritaRoutes = beritaList
    .filter((item) => item?.slug)
    .map((item) => ({
      url: `${base}/berita/${item.slug}`,
      lastModified: item?.updatedAt || item?.createdAt || now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  return [...staticRoutes, ...beritaRoutes];
}
