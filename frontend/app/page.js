import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ProfilSection from '@/components/ProfilSection';
import PendaftaranSection from '@/components/PendaftaranSection';
import BeritaSection from '@/components/BeritaSection';
import GaleriSection from '@/components/GaleriSection';
import GuruSection from '@/components/GuruSection';
import KontakSection from '@/components/KontakSection';
import ScrollToTop from '@/components/ScrollToTop';
import { FalsafahPondokSection, ValuePropSection, WhyChooseUsSection, SocialProofSection, FinalCTASection } from '@/components/Sections';

export const metadata = {
  title: 'Pondok Pesantren Modern Darul Mukhlisin | Pesantren Modern di Bandung Barat',
  description: 'Website resmi Pondok Pesantren Modern Darul Mukhlisin: profil pondok, berita terbaru, pendaftaran santri baru, program KMI, Ihya Al-Quran, dan Life Skills.',
  keywords: 'pondok pesantren modern, darul mukhlisin, pesantren bandung barat, pendaftaran santri, program KMI, tahfidz',
  alternates: {
    canonical: 'https://darulmukhlisin.ponpes.id/',
  },
  openGraph: {
    title: 'Pondok Pesantren Modern Darul Mukhlisin',
    description: 'Profil pondok, berita terbaru, pendaftaran santri, dan program unggulan Darul Mukhlisin.',
    url: 'https://darulmukhlisin.ponpes.id/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pondok Pesantren Modern Darul Mukhlisin',
    description: 'Profil pondok, berita terbaru, pendaftaran santri, dan program unggulan Darul Mukhlisin.',
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Pondok Pesantren Modern Darul Mukhlisin',
              url: 'https://darulmukhlisin.ponpes.id',
              logo: 'https://darulmukhlisin.ponpes.id/images/LOGO%20DMU.png',
              sameAs: [
                'https://www.instagram.com/darulmukhlisin.dmu/',
                'https://www.facebook.com/darulmukhlisin5715',
                'https://youtube.com/channel/UC-5X6CUlwlG9J6jJSA8sAIw'
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Pondok Pesantren Modern Darul Mukhlisin',
              url: 'https://darulmukhlisin.ponpes.id/',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Apakah bisa daftar PPSB secara online?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Bisa. Calon santri dapat mengisi formulir PPSB online melalui website resmi pondok.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Bagaimana informasi biaya masuk?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Informasi biaya masuk disampaikan resmi oleh admin pondok pada tahap verifikasi pendaftaran.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Apakah tersedia jalur beasiswa?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Tersedia jalur beasiswa sesuai kebijakan pondok dan hasil seleksi calon santri.',
                  },
                },
              ],
            }),
          }}
        />
        <HeroSection />
        <BeritaSection />
        <FalsafahPondokSection />
        <StatsSection />
        <ValuePropSection />
        <WhyChooseUsSection />
        <ProfilSection />
        <PendaftaranSection />
        <SocialProofSection />
        <GaleriSection />
        <GuruSection />
        <FinalCTASection />
        <KontakSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
