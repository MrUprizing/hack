import { BaseLayout } from "@/components/base-layout";
import { ComparisonSection } from "@/components/comparison-section";
import { DemoSection } from "@/components/demo-section";
import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { UseCasesSection } from "@/components/use-cases-sections";

export default function LandingPage() {
  return (
    <BaseLayout>
      <HeroSection />
      <FeaturesSection />
      <UseCasesSection />
      <HowItWorksSection />
      <ComparisonSection />
      <DemoSection />
    </BaseLayout>
  );
}
