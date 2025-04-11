import { useState, useEffect, useContext } from "react";
import { X, ChevronLeft, ChevronRight, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeContext } from "@/theme";
import { LanguageContext } from "@/Provider/language";
import { getText } from "@/lib/translations";

interface GalleryImage {
  id: number;
  titleKey: string;
  descriptionKey: string;
  url: string;
}

// Gallery images with translation keys instead of hardcoded text
const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    titleKey: "galleryImage1.title",
    descriptionKey: "galleryImage1.description",
    url: "https://res.cloudinary.com/deuef2tzm/image/upload/v1744366019/00000019_iotfx6.png",
  },
  {
    id: 2,
    titleKey: "galleryImage2.title",
    descriptionKey: "galleryImage2.description",
    url: "https://res.cloudinary.com/deuef2tzm/image/upload/v1744366339/image277_xnx3r8.png",
  },
  {
    id: 3,
    titleKey: "galleryImage3.title",
    descriptionKey: "galleryImage3.description",
    url: "https://res.cloudinary.com/deuef2tzm/image/upload/v1744366525/rnw_bot_mnl63j.jpg",
  },
  {
    id: 4,
    titleKey: "galleryImage4.title",
    descriptionKey: "galleryImage4.description",
    url: "https://res.cloudinary.com/deuef2tzm/image/upload/v1744366662/im1422age_lecybw.png",
  },
  {
    id: 5,
    titleKey: "galleryImage5.title",
    descriptionKey: "galleryImage5.description",
    url: "https://res.cloudinary.com/deuef2tzm/image/upload/v1744367246/Screenshot_2025-04-11_172706_rkseew.png",
  },
  {
    id: 6,
    titleKey: "galleryImage6.title",
    descriptionKey: "galleryImage6.description",
    url: "https://res.cloudinary.com/deuef2tzm/image/upload/v1744368732/IMG_0518_hhmo9d.jpg",
  },
];

const Gallery = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const { isDarkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const openLightbox = (image: GalleryImage) => {
    setCurrentImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const navigateLightbox = (direction: "next" | "prev") => {
    if (!currentImage) return;

    const currentIndex = GALLERY_IMAGES.findIndex(
      (img) => img.id === currentImage.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
    } else {
      newIndex =
        (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    }

    setCurrentImage(GALLERY_IMAGES[newIndex]);
  };

  const handleImageLoad = (id: number) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-id"));
            setVisibleItems((prev) => [...prev, id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".gallery-item");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        navigateLightbox("next");
      } else if (e.key === "ArrowLeft") {
        navigateLightbox("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentImage]);

  return (
    <section
      id="gallery"
      className={cn("py-24 relative", isDarkMode ? "bg-gray-50" : "")}
    >
      <div className="section-container">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold text-center mb-16",
            isDarkMode ? "text-orange-500" : "gold-gradient-text"
          )}
        >
          {getText("gallery", language)}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((image) => (
            <div
              key={image.id}
              data-id={image.id}
              className={cn(
                "gallery-item overflow-hidden cursor-pointer transition-all duration-500",
                isDarkMode
                  ? "bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg hover:border-orange-200"
                  : "glass-card card-hover",
                visibleItems.includes(image.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              onClick={() => openLightbox(image)}
            >
              <div className="relative aspect-video overflow-hidden">
                {!imagesLoaded[image.id] && (
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center",
                      isDarkMode ? "bg-gray-100" : "bg-clan-dark-accent"
                    )}
                  >
                    <Image
                      className={
                        isDarkMode
                          ? "text-orange-500 animate-pulse"
                          : "text-clan-gold animate-pulse"
                      }
                      size={24}
                    />
                  </div>
                )}
                <img
                  src={image.url}
                  alt={getText(image.titleKey, language)}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-500 hover:scale-110",
                    !imagesLoaded[image.id] && "opacity-0"
                  )}
                  onLoad={() => handleImageLoad(image.id)}
                />
              </div>
              <div className="p-4">
                <h3
                  className={
                    isDarkMode
                      ? "text-gray-800 font-semibold mb-1"
                      : "text-white font-semibold mb-1"
                  }
                >
                  {getText(image.titleKey, language)}
                </h3>
                <p
                  className={
                    isDarkMode
                      ? "text-gray-600 text-sm"
                      : "text-white/70 text-sm"
                  }
                >
                  {getText(image.descriptionKey, language)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox - update to use translations */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            onClick={closeLightbox}
            aria-label={getText("close", language)}
          >
            <X size={24} />
          </button>

          <button
            className={cn(
              "absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all z-10",
              isDarkMode
                ? "bg-white/20 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/30"
                : "bg-clan-dark-accent/70 backdrop-blur-sm text-white/70 hover:text-white hover:bg-clan-dark-accent/90"
            )}
            onClick={() => navigateLightbox("prev")}
            aria-label={getText("previous", language)}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className={cn(
              "absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all z-10",
              isDarkMode
                ? "bg-white/20 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/30"
                : "bg-clan-dark-accent/70 backdrop-blur-sm text-white/70 hover:text-white hover:bg-clan-dark-accent/90"
            )}
            onClick={() => navigateLightbox("next")}
            aria-label={getText("next", language)}
          >
            <ChevronRight size={24} />
          </button>

          <div className="max-w-5xl w-full">
            <div className="relative">
              <img
                src={currentImage.url}
                alt={getText(currentImage.titleKey, language)}
                className="w-full h-auto max-h-[80vh] object-contain animate-scale-in"
              />
            </div>

            <div
              className={cn(
                "mt-4 p-4 rounded-lg animate-fade-in",
                isDarkMode
                  ? "bg-white/10 backdrop-blur-sm"
                  : "bg-clan-dark-accent/70 backdrop-blur-sm"
              )}
            >
              <h3 className="text-white font-semibold text-lg">
                {getText(currentImage.titleKey, language)}
              </h3>
              <p className="text-white/70">
                {getText(currentImage.descriptionKey, language)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
