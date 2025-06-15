import { HeroSection } from "@/app/landing/components/HeroSection"
import { FeaturesSection } from "@/app/landing/components/FeaturesSection"
import { BenefitsSection } from "@/app/landing/components/BenefitsSection"
import { PricingSection } from "@/app/landing/components/PricingSection"
import { FAQSection } from "@/app/landing/components/FAQSection"
import { CTASection } from "@/app/landing/components/CTASection"

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
