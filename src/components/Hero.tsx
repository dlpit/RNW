import { useEffect, useState, useContext } from "react";
import { ArrowDown } from "lucide-react";
import { ThemeContext } from "@/theme";
import { LanguageContext } from "@/Provider/language";
import { getText } from "@/lib/translations";
import TextCycler from "@/lib/TextCycler";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  // In the getFormattedClanName function:

  const getFormattedClanName = () => {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>Rejuve Nation :</span>
        <div className="min-w-48 h-8 inline-block">
          <TextCycler
            words={
              language === "en"
                ? ["Warriors", "Fight", "Victory"]
                : ["Chiến Binh", "Chiến Đấu", "Chiến Thắng"]
            }
            className="text-clan-gold font-semibold whitespace-nowrap"
            typingSpeed={80}
            eraseSpeed={40}
            delayAfterComplete={1800}
          />
        </div>
      </div>
    );
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(13, 17, 28, 0.7), rgba(13, 17, 28, 0.9)), url('/lovable-uploads/Flux_Dev_Lots_of_people_have_a_bold_and_aggressive_esports_sty_0.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={`absolute inset-0 backdrop-blur-sm ${
          isDarkMode ? "bg-white/10" : "bg-clan-dark/30"
        }`}
      ></div>

      <div className="section-container relative z-10 flex flex-col items-center justify-center text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <img
            src="/lovable-uploads/e29eae61-9195-47c9-ae8f-ebed8bf80c4e.png"
            alt="RN:W Clan Logo"
            className="w-48 md:w-64 lg:w-80 mx-auto animate-float"
          />
        </div>

        <h1
          className={`mt-8 text-4xl md:text-6xl lg:text-7xl font-bold transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="gold-gradient-text">RN:W</span>
        </h1>
        <p
          className={`mt-4 text-xl md:text-2xl ${
            isDarkMode ? "text-white/90" : "text-white"
          } font-medium transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          {getFormattedClanName()}
        </p>

        <p
          className={`mt-6 max-w-2xl ${
            isDarkMode ? "text-white/70" : "text-white/90"
          } transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          {getText("clanDescription", language)}
        </p>

        <div
          className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-900 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="#stats"
            className="px-6 py-3 rounded-md bg-gradient-gold text-clan-dark font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.6)] transition-shadow duration-300"
          >
            {getText("clanStats", language)}
          </a>
          <a
            href="#recruitment"
            className="px-6 py-3 rounded-md bg-transparent border border-clan-gold text-clan-gold hover:bg-clan-gold/10 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-300"
          >
            {getText("joinNow", language)}
          </a>
        </div>
      </div>

      <a
        href="#stats"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 hover:text-clan-gold transition-colors duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default Hero;
