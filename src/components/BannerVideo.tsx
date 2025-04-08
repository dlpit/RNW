import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
    <section id="banner-video" className="py-16 relative">
      <div className="section-container">
        <h2 className="section-title text-center mb-8">Clan Highlights</h2>
        <div
          id="banner-video-container"
          className={cn(
            "glass-card overflow-hidden rounded-xl transition-all duration-1000",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10",
            className
          )}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-clan-dark-accent/50 backdrop-blur-sm z-10">
              <div className="w-12 h-12 rounded-full border-4 border-clan-gold border-t-transparent animate-spin"></div>
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
        <p className="text-center text-white/70 mt-4">
          Watch our clan defeat the elite dark dragon in SoS4 season
        </p>
      </div>
    </section>
  );
};

export default BannerVideo;
