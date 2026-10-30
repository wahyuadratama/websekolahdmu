import './globals.css'
import { Inter } from 'next/font/google'
import { getSiteSettings, resolveSiteImage } from '@/lib/siteSettings'
import WaFloatButton from '@/components/WaFloatButton'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const { identity, seo } = settings;
  const title = seo.defaultTitle || identity.siteName;
  const description = seo.defaultDescription || identity.tagline;

  return {
    metadataBase: new URL('https://darulmukhlisin.ponpes.id'),
    title,
    description,
    keywords: seo.keywords,
    authors: [{ name: identity.siteName }],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: 'https://darulmukhlisin.ponpes.id',
      siteName: identity.siteName,
      locale: 'id_ID',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: 'CKmSPMcOFRaFPrO2PeJ_v_V4zARKF4Q_3R5BbGclFVs',
    },
  };
}

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings();
  const favicon = resolveSiteImage(settings.identity.faviconUrl, '/images/LOGO DMU.png');

  return (
    <html lang="id">
      <head>
        <link rel="icon" href={favicon} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {children}
        <WaFloatButton />
      </body>
    </html>
  )
}
