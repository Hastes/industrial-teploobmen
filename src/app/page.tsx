import { Header } from "@/components/Header";
import { HeroSection } from "@/components/Hero/HeroSection";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-ink-950">
      <Header />
      <HeroSection />
    </main>
  );
}
