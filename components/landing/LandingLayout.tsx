import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import TargetAudience from "./TargetAudience";
import Plans from "./Plans";
import FAQ from "./FAQ";
import CTA from "./CTA";
import Footer from "./Footer";

export default function LandingLayout() {
  return (
    <>
      <Header />

      <main className="overflow-x-hidden bg-white">
        <Hero />
        <Features />
        <HowItWorks />
        <TargetAudience />
        <Plans />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  );
}