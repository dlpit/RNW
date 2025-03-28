import { useState, useEffect, useContext } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeContext } from "@/theme"; // Import context for dark mode
import {
  FaDiscord,
  FaFacebook,
  FaPhoneAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext); // Sử dụng context để lấy trạng thái dark mode

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Stats", href: "#stats" },
    { name: "Members", href: "#members" },
    { name: "Achievements", href: "#achievements" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-clan-dark/95 dark:bg-white/80 backdrop-blur-md border-b border-white/5 dark:border-black/10 py-3"
          : "bg-transparent dark:bg-white/80 backdrop-blur-sm py-5" // Updated this line to match the scrolled state's dark:bg-white/80
      )}
    >
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold font-bai gold-gradient-text dark:text-clan-dark tracking-wider">
            RN:W
          </span>
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
            </div>
          </div>
          <a
            href="#recruitment"
            className="px-4 py-2 rounded-md bg-gradient-gold text-clan-dark dark:text-clan-dark font-bai font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]"
          >
            Join Clan
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white dark:text-black p-1 rounded-md focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>

    {/* Mobile Navigation */}
    {isMobileMenuOpen && (
      <nav className="md:hidden glass-card mt-3 mx-4 p-4 animate-fade-in">
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white dark:text-gray-700 hover:text-clan-gold dark:hover:text-orange-500 p-2 transition-colors duration-200 font-medium tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#recruitment"
            className="px-4 py-2 rounded-md bg-gradient-gold text-clan-dark dark:text-clan-dark font-bai font-semibold text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Join Clan
          </a>
        </div>

        {/* Social Media Icons for Mobile */}
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://discord.com"
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
            <FaPhoneAlt size={20} />
          </a>
        </div>
      </nav>
    )}
  </header>
);
};

export default Navbar;