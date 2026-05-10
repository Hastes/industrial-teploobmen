import { Header } from "@/components/Header";
import { HeroSection } from "@/components/Hero/HeroSection";
import { CatalogSection } from "@/components/Catalog/CatalogSection";
import { AudiencesSection } from "@/components/Audiences/AudiencesSection";
import { ProblemsSection } from "@/components/Problems/ProblemsSection";
import { ProcessSection } from "@/components/Process/ProcessSection";
import { CasesSection } from "@/components/Cases/CasesSection";
import { PricingSection } from "@/components/Pricing/PricingSection";
import { FinalCTASection } from "@/components/CTA/FinalCTASection";
import { Footer } from "@/components/Footer/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-ink-950">
      <Header />
      <HeroSection />
      <CatalogSection />
      <AudiencesSection />
      <ProblemsSection />
      <ProcessSection />
      <CasesSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
