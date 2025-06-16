import { HeroSection } from '@/app/(marketing)/about/components/hero-section'
import { FeaturesSection } from '@/app/(marketing)/about/components/features-section'
import { BenefitsSection } from '@/app/(marketing)/about/components/benefits-section'
import { PricingSection } from '@/app/(marketing)/about/components/pricing-section'
import { FAQSection } from '@/app/(marketing)/about/components/faq-section'
import { CTASection } from '@/app/(marketing)/about/components/cta-section'

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
