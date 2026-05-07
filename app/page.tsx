import { AmbientEffects } from "@/components/AmbientEffects";
import { CountdownSection } from "@/components/CountdownSection";
import { EventDetailsSection } from "@/components/EventDetailsSection";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { OurStorySection } from "@/components/OurStorySection";
import { RSVPSection } from "@/components/RSVPSection";

export default function Home() {
  return (
    <>
      <AmbientEffects />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <OurStorySection />
        <EventDetailsSection />
        <CountdownSection />
        <GallerySection />
        <RSVPSection />
      </main>
      <Footer />
    </>
  );
}
