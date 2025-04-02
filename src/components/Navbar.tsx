import { useState, useEffect, useContext, useRef } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeContext } from "@/theme";
import { LanguageContext } from "@/Provider/language";
import { getText } from "@/lib/translations";
import {
  FaDiscord,
  FaFacebook,
  FaPhoneAlt,
  FaSun,
  FaMoon,
  FaLanguage,
} from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { language, toggleLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: getText("home", language), href: "#home" },
    { name: getText("stats", language), href: "#stats" },
    { name: getText("members", language), href: "#members" },
    { name: getText("achievements", language), href: "#achievements" },
    { name: getText("gallery", language), href: "#gallery" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-clan-dark/95 dark:bg-white/80 backdrop-blur-md border-b border-white/5 dark:border-black/10 py-3"
          : "bg-transparent dark:bg-white/80 backdrop-blur-sm py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className="text-2xl font-bold font-bai gold-gradient-text dark:text-clan-dark tracking-wider cursor-pointer select-none"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              RN:W
            </div>
            <div className="hidden md:flex items-center space-x-4 text-white dark:text-black">
              <button
                onClick={toggleLanguage}
                className="ml-2 text-white dark:text-black hover:text-clan-gold dark:hover:text-orange-500 transition-colors duration-200 flex items-center"
                aria-label="Toggle Language"
              >
                <FaLanguage size={42} />
                <div className="ml-2 relative w-10 h-7 overflow-hidden">
                  <span
                    className={`absolute text-xl font-medium transition-transform duration-300 ${
                      language === "en"
                        ? "translate-y-0 -translate-x-3"
                        : "-translate-y-8 -translate-x-3"
                    }`}
                  >
                    EN
                  </span>
                  <span
                    className={`absolute text-xl font-medium transition-transform duration-300 ${
                      language === "en"
                        ? "translate-y-8 -translate-x-3"
                        : "translate-y-0 -translate-x-3"
                    }`}
                  >
                    VI
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white dark:text-gray-700 hover:text-clan-gold dark:hover:text-orange-500 transition-colors duration-200 tracking-wide"
              >
                {link.name}
              </a>
            ))}
            {/* Social Media Icons */}
            <div className="hidden md:flex items-center space-x-4 border border-white/20 dark:border-black/20 rounded-md p-2">
              <a
                href="https://discord.gg/rnw-cod"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white dark:text-gray-700 hover:text-clan-gold dark:hover:text-orange-500 transition-colors duration-200"
                aria-label="Discord"
              >
                <FaDiscord size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white dark:text-gray-700 hover:text-clan-gold dark:hover:text-orange-500 transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white dark:text-gray-700 hover:text-clan-gold dark:hover:text-orange-500 transition-colors duration-200"
                aria-label="Zalo"
              >
                <FaPhoneAlt size={17} />
              </a>
              <div className="border-l border-white/20 dark:border-black/20 pl-4 flex items-center space-x-2">
                <button
                  onClick={toggleDarkMode}
                  className="text-white dark:text-gray-700 hover:text-clan-gold dark:hover:text-orange-500 transition-transform duration-300 transform hover:scale-110"
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? (
                    <FaSun
                      size={18}
                      className="transition-transform duration-300 transform rotate-0 hover:rotate-180"
                    />
                  ) : (
                    <FaMoon
                      size={18}
                      className="transition-transform duration-300 transform rotate-0 hover:rotate-180"
                    />
                  )}
                </button>

                {/* Language toggle button */}
              </div>
            </div>
            <a
              href="#recruitment"
              className="px-6 py-2.5 rounded-md bg-gradient-gold text-clan-dark dark:text-clan-dark font-bai font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.6)] hover:scale-105 flex items-center justify-center"
            >
              {getText("joinClan", language)}
            </a>
          </nav>

          {/* Mobile Language Toggle and Menu Button */}
          <div className="md:hidden flex items-center">
            {/* Mobile Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="mr-4 text-white dark:text-black hover:text-clan-gold dark:hover:text-orange-500 transition-colors duration-200 flex items-center"
              aria-label="Toggle Language"
            >
              <FaLanguage size={24} />
              <div className="ml-1 relative w-8 h-5 overflow-hidden">
                <span
                  className={`absolute text-sm font-medium transition-transform duration-300 ${
                    language === "en"
                      ? "translate-y-0 -translate-x-2"
                      : "-translate-y-6 -translate-x-2"
                  }`}
                >
                  EN
                </span>
                <span
                  className={`absolute text-sm font-medium transition-transform duration-300 ${
                    language === "en"
                      ? "translate-y-6 -translate-x-2"
                      : "translate-y-0 -translate-x-2"
                  }`}
                >
                  VI
                </span>
              </div>
            </button>

            {/* Mobile menu button */}
            <button
              ref={menuButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white dark:text-black p-1 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div ref={menuRef}>
          <nav className="md:hidden backdrop-blur-md bg-clan-dark/90 dark:bg-white/90 border border-white/10 dark:border-black/10 mt-3 mx-4 rounded-lg p-5 animate-fade-in shadow-lg">
            <div className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white dark:text-gray-700 hover:text-clan-gold dark:hover:text-orange-500 p-2 transition-colors duration-200 font-medium tracking-wide text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#recruitment"
                className="px-4 py-3 rounded-md bg-gradient-gold text-clan-dark dark:text-clan-dark font-bai font-semibold text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Clan
              </a>
            </div>

            {/* Social Media Icons for Mobile */}
            <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-white/10 dark:border-black/10">
              <a
                href="https://discord.gg/rnw-cod"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white dark:text-gray-700 hover:text-clan-gold dark:hover:text-orange-500 transition-all duration-200 transform hover:scale-110"
                aria-label="Discord"
              >
                <FaDiscord size={22} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white dark:text-gray-700 hover:text-clan-gold dark:hover:text-orange-500 transition-all duration-200 transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook size={22} />
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white dark:text-gray-700 hover:text-clan-gold dark:hover:text-orange-500 transition-all duration-200 transform hover:scale-110"
                aria-label="Zalo"
              >
                <FaPhoneAlt size={19} />
              </a>

              {/* Dark Mode Toggle for Mobile */}
              <button
                onClick={toggleDarkMode}
                className="text-white dark:text-gray-700 hover:text-clan-gold dark:hover:text-orange-500 transition-all duration-300 transform hover:scale-110 ml-2"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  <FaSun
                    size={20}
                    className="transition-transform duration-300 transform rotate-0 hover:rotate-180"
                  />
                ) : (
                  <FaMoon
                    size={20}
                    className="transition-transform duration-300 transform rotate-0 hover:rotate-180"
                  />
                )}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
