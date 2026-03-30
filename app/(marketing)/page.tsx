import Hero from '@/components/sections/Hero';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import ReferralSection from '@/components/sections/ReferralSection';
import CoursesSection from '@/components/sections/CoursesSection';
import StatsCounter from '@/components/sections/StatsCounter';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import CTABanner from '@/components/sections/CTABanner';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <ReferralSection />
      <CoursesSection />
      <StatsCounter />
      <TestimonialsCarousel />
      <CTABanner />
    </>
  );
}
