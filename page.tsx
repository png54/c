import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TopArtisansSection from "@/components/home/TopArtisansSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import AppDownloadSection from "@/components/home/AppDownloadSection";
import TrustBadgesSection from "@/components/home/TrustBadgesSection";

export const metadata: Metadata = {
  title: "خدماتي - منصة الخدمات المنزلية في الجزائر",
  description:
    "اعثر على حرفي محترف موثوق قريب منك في الجزائر. كهربائي، سباك، نجار، دهان، مصلح أجهزة وأكثر — بسهولة وأمان.",
};

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <TopArtisansSection />
      </Suspense>
      <StatsSection />
      <TrustBadgesSection />
      <TestimonialsSection />
      <AppDownloadSection />
      <Footer />
    </main>
  );
}
