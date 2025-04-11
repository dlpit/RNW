import { useState, useEffect, useContext } from "react";
import { cn } from "@/lib/utils";
import { ThemeContext } from "@/theme";
import { LanguageContext } from "@/Provider/language";
import { getText } from "@/lib/translations";

interface BannerVideoProps {
  videoId?: string;
  title?: string;
  className?: string;
}

const BannerVideo = ({
  videoId = "ih5xtikpfmo",
  title = "RN:W Clan Showcase",
  className,
}: BannerVideoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const videoElement = document.getElementById("banner-video-container");
    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  return (
    <section
      id="banner-video"
      className={cn("py-16 relative", isDarkMode ? "bg-gray-50" : "")}
    >
      <div className="section-container">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold text-center mb-8",
            isDarkMode ? "text-orange-500" : "gold-gradient-text"
          )}
        >
          {getText("clanHighlights", language) || "Clan Highlights"}
        </h2>
        <div
          id="banner-video-container"
          className={cn(
            "overflow-hidden rounded-xl transition-all duration-1000 shadow-lg",
            isDarkMode ? "bg-white border border-gray-200" : "glass-card",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10",
            className
          )}
        >
          {isLoading && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center backdrop-blur-sm z-10",
                isDarkMode ? "bg-gray-100/70" : "bg-clan-dark-accent/50"
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full border-4 border-t-transparent animate-spin",
                  isDarkMode ? "border-orange-500" : "border-clan-gold"
                )}
              ></div>
            </div>
          )}
          <div className="relative aspect-[21/9] w-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?si=CnO5h3-x7MBJDcZ4`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
            ></iframe>
          </div>
        </div>
        <p
          className={cn(
            "text-center mt-4",
            isDarkMode ? "text-gray-600" : "text-white/70"
          )}
        >
          {getText("watchClanVideo", language) ||
            "Watch our clan defeat the elite dark dragon in SoS4 season"}
        </p>
      </div>
    </section>
  );
};

export default BannerVideo;
