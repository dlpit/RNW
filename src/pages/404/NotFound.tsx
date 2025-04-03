
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-clan-dark">
      <div className="text-center p-8 max-w-xl animate-fade-in glass-card">
        <h1 className="text-6xl font-bold mb-4 gold-gradient-text">404</h1>
        <p className="text-xl text-white mb-6">Territory unexplored! This page doesn't exist in our realm.</p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 rounded-md bg-gradient-gold text-clan-dark font-semibold hover:shadow-[0_0_15px_rgba(255,215,0,0.6)] transition-all duration-300"
        >
          <ArrowLeft size={18} className="mr-2" />
          Return to Base
        </a>
      </div>
    </div>
  );
};

export default NotFound;
