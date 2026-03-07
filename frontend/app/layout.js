import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://darulmukhlisin.ponpes.id'),
  title: 'Pondok Pesantren Modern Darul Mukhlisin',
  description: 'Membangun Generasi Unggul dengan Pendidikan Berkualitas dan Karakter Islami. Program KMI, Ihya Al-Quran, dan Life Skills.',
  keywords: 'pesantren, pondok pesantren, darul mukhlisin, pendidikan islam, KMI, tahfidz, bandung barat',
  authors: [{ name: 'Pondok Pesantren Modern Darul Mukhlisin' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pondok Pesantren Modern Darul Mukhlisin',
    description: 'Membangun Generasi Unggul dengan Pendidikan Berkualitas dan Karakter Islami',
    url: 'https://darulmukhlisin.ponpes.id',
    siteName: 'Pondok Pesantren Modern Darul Mukhlisin',
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/images/LOGO DMU.png" />
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
