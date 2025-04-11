import { ArrowUp } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "@/Provider/language";
import { ThemeContext } from "@/theme";
import { getText } from "@/lib/translations";
import { cn } from "@/lib/utils";

// ...existing imports

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { language } = useContext(LanguageContext);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <footer
      className={cn(
        "relative pt-16 pb-8",
        isDarkMode
          ? "border-t border-gray-200 bg-white" // Reversed
          : "border-t border-white/10 bg-clan-dark"
      )}
    >
      <div className="section-container">
        <button
          onClick={scrollToTop}
          className={cn(
            "absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 rounded-full flex items-center justify-center transition-shadow duration-300",
            isDarkMode
              ? "bg-orange-500 text-white hover:shadow-lg" // Reversed
              : "bg-gradient-gold text-clan-dark hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]"
          )}
          aria-label={getText("backToTop", language)}
        >
          <ArrowUp size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/lovable-uploads/e29eae61-9195-47c9-ae8f-ebed8bf80c4e.png"
                alt="RN:W Clan Logo"
                className="w-10 h-10 mr-2"
              />
              <h3
                className={cn(
                  "text-xl font-bold",
                  isDarkMode
                    ? "text-orange-500" // Reversed
                    : "gold-gradient-text"
                )}
              >
                RN:W Clan
              </h3>
            </div>
            <p
              className={cn(
                "mb-4",
                isDarkMode
                  ? "text-gray-600" // Reversed
                  : "text-white/70"
              )}
            >
              {getText("footerDescription", language)}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://discord.gg/rnw-cod"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200",
                  isDarkMode
                    ? "bg-gray-100 text-gray-600 hover:text-orange-500"
                    : "bg-clan-dark-accent text-white/70 hover:text-clan-gold"
                )}
                aria-label="Discord"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <circle cx="9" cy="12" r="1"></circle>
                  <circle cx="15" cy="12" r="1"></circle>
                  <path d="M7.5 7.7c.7-.7 1.5-1.2 2.5-1.5a10 10 0 0 1 4 0c1 .3 1.8.8 2.5 1.5"></path>
                  <path d="M7 16.5c.7.7 1.5 1.2 2.5 1.5a10 10 0 0 0 4 0c1-.3 1.8-.8 2.5-1.5"></path>
                  <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5"></path>
                  <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.476-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5"></path>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/rnw284/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200",
                  isDarkMode
                    ? "bg-gray-100 text-gray-600 hover:text-orange-500"
                    : "bg-clan-dark-accent text-white/70 hover:text-clan-gold"
                )}
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@rnwofficial-284"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200",
                  isDarkMode
                    ? "bg-gray-100 text-gray-600 hover:text-orange-500"
                    : "bg-clan-dark-accent text-white/70 hover:text-clan-gold"
                )}
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3
              className={cn(
                "font-semibold mb-4",
                isDarkMode
                  ? "text-gray-800" // Reversed
                  : "text-white"
              )}
            >
              {getText("quickLinks", language)}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className={cn(
                    "transition-colors duration-200",
                    isDarkMode
                      ? "text-gray-600 hover:text-orange-500" // Reversed
                      : "text-white/70 hover:text-clan-gold"
                  )}
                >
                  {getText("home", language)}
                </a>
              </li>
              <li>
                <a
                  href="#stats"
                  className={cn(
                    "transition-colors duration-200",
                    isDarkMode
                      ? "text-gray-600 hover:text-orange-500"
                      : "text-white/70 hover:text-clan-gold"
                  )}
                >
                  {getText("clanStats", language)}
                </a>
              </li>
              <li>
                <a
                  href="#members"
                  className={cn(
                    "transition-colors duration-200",
                    isDarkMode
                      ? "text-gray-600 hover:text-orange-500"
                      : "text-white/70 hover:text-clan-gold"
                  )}
                >
                  {getText("members", language)}
                </a>
              </li>
              <li>
                <a
                  href="#achievements"
                  className={cn(
                    "transition-colors duration-200",
                    isDarkMode
                      ? "text-gray-600 hover:text-orange-500"
                      : "text-white/70 hover:text-clan-gold"
                  )}
                >
                  {getText("achievements", language)}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className={cn(
                    "transition-colors duration-200",
                    isDarkMode
                      ? "text-gray-600 hover:text-orange-500"
                      : "text-white/70 hover:text-clan-gold"
                  )}
                >
                  {getText("gallery", language)}
                </a>
              </li>
              {/* Repeat similar changes for all links */}
            </ul>
          </div>

          <div>
            <h3
              className={cn(
                "font-semibold mb-4",
                isDarkMode
                  ? "text-gray-800" // Reversed
                  : "text-white"
              )}
            >
              {getText("contactUs", language)}
            </h3>
            <p
              className={cn(
                "mb-2",
                isDarkMode
                  ? "text-gray-600" // Reversed
                  : "text-white/70"
              )}
            >
              {getText("contactQuestion", language)}
            </p>
            <a
              href="mailto:recruitment.rnw@gmail.com"
              className={cn(
                "inline-block px-4 py-2 rounded-md transition-colors duration-200 mb-4",
                isDarkMode
                  ? "bg-gray-100 text-gray-700 hover:text-orange-500 border border-gray-200" // Reversed
                  : "bg-clan-dark-accent text-white/80 hover:text-clan-gold border border-white/10"
              )}
            >
              recruitment.rnw@gmail.com
            </a>
            <p className={isDarkMode ? "text-gray-600" : "text-white/70"}>
              {" "}
              {/* Reversed */}
              {getText("joinDiscord", language)}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "pt-6 flex flex-col md:flex-row justify-between items-center",
            isDarkMode
              ? "border-t border-gray-200" // Reversed
              : "border-t border-white/10"
          )}
        >
          <p
            className={
              isDarkMode ? "text-gray-500 text-sm" : "text-white/50 text-sm" // Reversed
            }
          >
            &copy; {new Date().getFullYear()} {getText("copyright", language)}
          </p>
          <div className="mt-4 md:mt-0">
            <p
              className={
                isDarkMode ? "text-gray-500 text-sm" : "text-white/50 text-sm" // Reversed
              }
            >
              {getText("developedBy", language)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
