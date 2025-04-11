import { useEffect, useState, useContext } from "react";
import {
  Trophy,
  Users,
  Star,
  Crown,
  Zap,
  Award,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { ThemeContext } from "@/theme";
import { LanguageContext } from "@/Provider/language";
import { getText } from "@/lib/translations";

const StatCard = ({
  icon,
  value,
  label,
  delay,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = document.getElementById(
      `stat-${label.toLowerCase().replace(/\s+/g, "-")}`
    );
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [label]);

  return (
    <div
      id={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
      className={cn(
        "glass-card p-6 card-hover transition-opacity duration-1000",
        isDarkMode
          ? "bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md"
          : "bg-clan-dark-accent/80 backdrop-blur-sm border border-white/10",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={cn(
            "w-16 h-16 flex items-center justify-center rounded-full border border-clan-gold/30 mb-4",
            isDarkMode
              ? "bg-gray-100 text-orange-500"
              : "bg-clan-dark-accent text-clan-gold"
          )}
        >
          {icon}
        </div>
        <div className="gold-gradient-text text-3xl md:text-4xl font-bold mb-2">
          {value}
        </div>
        <div className={isDarkMode ? "text-gray-700" : "text-white/70"}>
          {label}
        </div>
      </div>
    </div>
  );
};

const KingdomCard = () => {
  const [isVisible, setIsVisible] = useState(false);
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

    const currentElement = document.getElementById("kingdom-card");
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      id="kingdom-card"
      className={cn(
        "overflow-hidden transition-opacity duration-1000 h-full",
        isDarkMode
          ? "bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg rounded-lg"
          : "glass-card bg-clan-dark-accent/80 backdrop-blur-sm border border-white/10",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="relative">
        <div className="h-64 relative overflow-hidden">
          <img
            src="/lovable-uploads/kingdom-banner.png"
            alt="Kingdom Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm flex items-center">
          <MapPin size={14} className="text-clan-gold mr-1" />
          <span className="text-white font-bold">
            {getText("kingdom", language)} 284
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="text-center mb-4">
          <div className="inline-block bg-black/30 px-3 py-1 rounded-full text-sm mb-2">
            <span className="text-white">
              {getText("allianceOne", language)}
            </span>
          </div>
          <h3
            className={`text-xl font-bold ${
              isDarkMode ? "text-gray-800" : "text-white"
            }`}
          >
            {getText("clanFullTitle", language)}
          </h3>
        </div>

        <Table className="w-full">
          <TableBody
            className={`divide-y ${
              isDarkMode ? "divide-gray-200" : "divide-white/10"
            }`}
          >
            <TableRow
              className={cn(
                "transition-colors duration-200",
                isDarkMode
                  ? "border-gray-200 hover:bg-gray-50"
                  : "border-white/10 hover:bg-clan-dark-accent/90"
              )}
            >
              <TableCell
                className={`py-3 px-0 ${
                  isDarkMode ? "text-gray-600" : "text-white/70"
                }`}
              >
                {getText("powerText", language)}
              </TableCell>
              <TableCell
                className={`py-3 px-0 text-right font-bold ${
                  isDarkMode ? "text-gray-800" : "text-white"
                }`}
              >
                11.579.726.553
              </TableCell>
            </TableRow>
            <TableRow
              className={cn(
                "transition-colors duration-200",
                isDarkMode
                  ? "border-gray-200 hover:bg-gray-50"
                  : "border-white/10 hover:bg-clan-dark-accent/90"
              )}
            >
              <TableCell
                className={`py-3 px-0 ${
                  isDarkMode ? "text-gray-600" : "text-white/70"
                }`}
              >
                {getText("leaderText", language)}
              </TableCell>
              <TableCell
                className={`py-3 px-0 text-right font-bold flex items-center justify-end gap-2 ${
                  isDarkMode ? "text-gray-800" : "text-white"
                }`}
              >
                M A X
                <Crown size={16} className="text-yellow-500" />
              </TableCell>
            </TableRow>
            <TableRow
              className={cn(
                "transition-colors duration-200",
                isDarkMode
                  ? "border-gray-200 hover:bg-gray-50"
                  : "border-white/10 hover:bg-clan-dark-accent/90"
              )}
            >
              <TableCell
                className={`py-3 px-0 ${
                  isDarkMode ? "text-gray-600" : "text-white/70"
                }`}
              >
                {getText("leagueGiftText", language)}
              </TableCell>
              <TableCell
                className={`py-3 px-0 text-right font-bold ${
                  isDarkMode ? "text-gray-800" : "text-white"
                }`}
              >
                <div className="flex items-center justify-end gap-1">
                  Lv.50
                  <GraduationCap size={16} className="text-yellow-500" />
                </div>
              </TableCell>
            </TableRow>
            <TableRow
              className={cn(
                "transition-colors duration-200",
                isDarkMode
                  ? "border-gray-200 hover:bg-gray-50"
                  : "border-white/10 hover:bg-clan-dark-accent/90"
              )}
            >
              <TableCell
                className={`py-3 px-0 ${
                  isDarkMode ? "text-gray-600" : "text-white/70"
                }`}
              >
                {getText("membersText", language)}
              </TableCell>
              <TableCell
                className={`py-3 px-0 text-right font-bold ${
                  isDarkMode ? "text-gray-800" : "text-white"
                }`}
              >
                <div className="flex items-center justify-end gap-1">
                  200/200
                  <Users
                    size={16}
                    className={isDarkMode ? "text-gray-800" : "text-white"}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow
              className={cn(
                "transition-colors duration-200",
                isDarkMode
                  ? "border-gray-200 hover:bg-gray-50"
                  : "border-white/10 hover:bg-clan-dark-accent/90"
              )}
            >
              <TableCell
                className={`py-3 px-0 text-xs ${
                  isDarkMode ? "text-gray-600" : "text-white/70"
                }`}
              >
                {getText("allianceForceText", language)}
              </TableCell>
              <TableCell
                className={`py-3 px-0 text-right font-bold ${
                  isDarkMode ? "text-gray-800" : "text-white"
                }`}
              >
                {getText("diamond", language)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const Stats = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const stats = [
    {
      icon: <Trophy size={28} />,
      value: "4",
      label: getText("victories", language),
      delay: 100,
    },
    {
      icon: <Users size={28} />,
      value: "150+",
      label: getText("members", language),
      delay: 200,
    },
    {
      icon: <Star size={28} />,
      value: "24",
      label: getText("t5Members", language),
      delay: 300,
    },
    {
      icon: <Crown size={28} />,
      value: "C",
      label: getText("seed", language),
      delay: 400,
    },
    {
      icon: <Zap size={28} />,
      value: "1.5B+",
      label: getText("kvkMerit", language),
      delay: 500,
    },
    {
      icon: <MapPin size={28} />,
      value: "284",
      label: getText("kingdom", language),
      delay: 800,
    },
  ];

  return (
    <section
      id="stats"
      className={`py-24 relative ${isDarkMode ? "bg-gray-50" : "bg-clan-dark"}`}
    >
      <div className="section-container">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold text-center mb-16",
            isDarkMode ? "text-orange-500" : "gold-gradient-text"
          )}
        >
          {getText("clanStats", language) || "Thống Kê Clan"}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Kingdom Card */}
          <div className="flex justify-center">
            <KingdomCard />
          </div>

          {/* Right Side - Stats */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  delay={stat.delay}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
