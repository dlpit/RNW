import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-16 pb-8 border-t border-white/10">
      <div className="section-container">
        <button
          onClick={scrollToTop}
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-gradient-gold text-clan-dark rounded-full flex items-center justify-center hover:shadow-[0_0_15px_rgba(255,215,0,0.6)] transition-shadow duration-300"
          aria-label="Back to top"
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
              <h3 className="text-xl font-bold gold-gradient-text">
                RN:W Clan
              </h3>
            </div>
            <p className="text-white/70 mb-4">
              Elite gaming clan dominating Call of Dragon. Join our ranks and
              rise to glory.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-clan-dark-accent flex items-center justify-center text-white/70 hover:text-clan-gold transition-colors duration-200"
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
                  <path d="M18 8.5a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-7z"></path>
                  <path d="M20 11v2"></path>
                  <path d="M4 11v2"></path>
                  <path d="M14 5v2"></path>
                  <path d="M10 5v2"></path>
                  <path d="M14 17v2"></path>
                  <path d="M10 17v2"></path>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-clan-dark-accent flex items-center justify-center text-white/70 hover:text-clan-gold transition-colors duration-200"
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
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-clan-dark-accent flex items-center justify-center text-white/70 hover:text-clan-gold transition-colors duration-200"
                aria-label="Twitter"
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
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-1-4.8 4-8.9 8-5 1.6-1 3-2.2 4-4z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-clan-dark-accent flex items-center justify-center text-white/70 hover:text-clan-gold transition-colors duration-200"
                aria-label="TikTok"
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
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                  <path d="M15 8a4 4 0 0 0 0 8"></path>
                  <path d="M15 8h.01"></path>
                  <path d="M15 2h.01"></path>
                  <path d="M15 2v10"></path>
                  <path d="M9 16v6"></path>
                  <path d="M19 8v8a5 5 0 0 1-5 5h-4"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-white/70 hover:text-clan-gold transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#stats"
                  className="text-white/70 hover:text-clan-gold transition-colors duration-200"
                >
                  Stats
                </a>
              </li>
              <li>
                <a
                  href="#members"
                  className="text-white/70 hover:text-clan-gold transition-colors duration-200"
                >
                  Members
                </a>
              </li>
              <li>
                <a
                  href="#achievements"
                  className="text-white/70 hover:text-clan-gold transition-colors duration-200"
                >
                  Achievements
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-white/70 hover:text-clan-gold transition-colors duration-200"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#recruitment"
                  className="text-white/70 hover:text-clan-gold transition-colors duration-200"
                >
                  Join Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <p className="text-white/70 mb-2">Have questions about our clan?</p>
            <a
              href="mailto:recruitment.rnw@gmail.com"
              className="inline-block bg-clan-dark-accent px-4 py-2 rounded-md text-white/80 hover:text-clan-gold transition-colors duration-200 border border-white/10 mb-4"
            >
              recruitment.rnw@gmail.com
            </a>
            <p className="text-white/70">
              Join our Discord for faster communication and community events.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} RN:W Clan. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-white/50 text-sm">
              Not affiliated with Call of Dragon or its developers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
