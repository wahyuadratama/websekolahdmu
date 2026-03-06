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
import { ValuePropSection, WhyChooseUsSection, SocialProofSection, FinalCTASection } from '@/components/Sections';

export const metadata = {
  title: 'Ponpes Modern Darul Mukhlisin - Beranda',
  description: 'Pondok Pesantren Modern Darul Mukhlisin - Membangun Generasi Unggul dengan Pendidikan Berkualitas dan Karakter Islami',
  keywords: 'pondok pesantren, pesantren modern, darul mukhlisin, pendidikan islam, bandung barat',
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <BeritaSection />
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
