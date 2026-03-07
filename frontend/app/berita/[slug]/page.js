import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE, API_URL } from '@/lib/config';
import { sanitizeHtml } from '@/lib/sanitize';

async function getBerita(slug) {
  try {
    const res = await fetch(`${API_BASE}/berita/slug/${slug}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching berita:', error);
    return null;
  }
}

async function getRelatedBerita(kategori, currentId) {
  try {
    const res = await fetch(`${API_BASE}/berita?status=published`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    if (!data.success) return [];
    
    return data.data
      .filter(item => item.kategori === kategori && item.id !== currentId)
      .slice(0, 3);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const berita = await getBerita(params.slug);
  const articleUrl = `https://darulmukhlisin.ponpes.id/berita/${params.slug}`;

  if (!berita) {
    return {
      title: 'Berita Tidak Ditemukan',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = (berita.excerpt || berita.konten?.replace(/<[^>]*>/g, '').substring(0, 160) || '').trim();
  const imageUrl = berita.gambar
    ? (berita.gambar.startsWith('http') ? berita.gambar : `${API_URL}${berita.gambar}`)
    : `${API_URL}/uploads/masjid.JPG`;

  return {
    title: `${berita.judul} - Ponpes Darul Mukhlisin`,
    description,
    keywords: berita.tags?.join(', ') || 'pondok pesantren, berita, darul mukhlisin',
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: berita.judul,
      description,
      url: articleUrl,
      images: [{ url: imageUrl }],
      type: 'article',
      publishedTime: berita.createdAt,
      authors: [berita.author || 'Admin'],
    },
    twitter: {
      card: 'summary_large_image',
      title: berita.judul,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BeritaDetailPage({ params }) {
  const berita = await getBerita(params.slug);

  if (!berita) {
    notFound();
  }

  const articleUrl = `https://darulmukhlisin.ponpes.id/berita/${params.slug}`;
  const relatedBerita = await getRelatedBerita(berita.kategori, berita.id);

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Beranda</Link>
            <span className="mx-2">/</span>
            <Link href="/#berita" className="hover:text-blue-600">Berita</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{berita.judul}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                {berita.kategori}
              </span>
              {berita.tags?.map((tag, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                  #{tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {berita.judul}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <i className="fas fa-user"></i>
                <span>{berita.author || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-calendar"></i>
                <span>{new Date(berita.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-eye"></i>
                <span>{berita.views || 0} views</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {berita.gambar && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={berita.gambar.startsWith('http') ? berita.gambar : `${API_URL}${berita.gambar}`}
                alt={berita.judul}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(berita.konten) }}
          />

          {/* Share Buttons */}
          <div className="border-t border-b py-6 mb-12">
            <h3 className="text-lg font-bold mb-4">Bagikan Artikel:</h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <i className="fab fa-facebook mr-2"></i>Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(berita.judul)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition"
              >
                <i className="fab fa-twitter mr-2"></i>Twitter
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${berita.judul} - ${articleUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <i className="fab fa-whatsapp mr-2"></i>WhatsApp
              </a>
            </div>
          </div>

          {/* Related Posts */}
          {relatedBerita.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Berita Terkait</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBerita.map((item) => (
                  <Link
                    key={item.id}
                    href={`/berita/${item.slug}`}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                  >
                    <Image
                      src={item.gambar ? (item.gambar.startsWith('http') ? item.gambar : `${API_URL}${item.gambar}`) : 'https://via.placeholder.com/400x250'}
                      alt={item.judul}
                      width={400}
                      height={250}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <span className="text-xs text-blue-600 font-semibold">{item.kategori}</span>
                      <h3 className="font-bold mt-2 mb-2 line-clamp-2">{item.judul}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.excerpt || item.konten.substring(0, 80)}...
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back Button */}
          <div className="text-center">
            <Link
              href="/#berita"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <i className="fas fa-arrow-left mr-2"></i>Kembali ke Berita
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
