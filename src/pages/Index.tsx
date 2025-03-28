import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Members from "@/components/Members";
import Achievements from "@/components/Achievements";
import Gallery from "@/components/Gallery";
import Recruitment from "@/components/Recruitment";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical assets
    const preloadImages = () => {
      const criticalImages = [
        "/lovable-uploads/e29eae61-9195-47c9-ae8f-ebed8bf80c4e.png",
        "/lovable-uploads/Flux_Dev_Lots_of_people_have_a_bold_and_aggressive_esports_sty_0.jpeg",
      ];

      criticalImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadImages();

    // Ensure minimum loading time for visual effect (optional)
    const minLoadingTime = setTimeout(() => {
      // This timeout ensures the loading screen shows for at least 2 seconds
      // even if everything loads quickly
    }, 2000);

    return () => clearTimeout(minLoadingTime);
  }, []);

  const handleLoadingComplete = () => {
    // Add a class to the body to prevent scrolling during loading
    document.body.classList.remove("overflow-hidden");
    setIsLoading(false);
  };

  useEffect(() => {
    // Prevent scrolling during loading
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div className="min-h-screen">
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        <Navbar />
        <Hero />
        <Stats />
        <Members />
        <Achievements />
        <Gallery />
        <Recruitment />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
