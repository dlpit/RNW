import { useState, useEffect, useContext } from "react";
import { Trophy, Star, Award, Flag, Target, Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeContext } from "@/theme";
import { LanguageContext } from "@/Provider/language";
import { getText } from "@/lib/translations";

interface Achievement {
  id: number;
  titleKey: string;
  day: number;
  month: number;
  year: number;
  descriptionKey: string;
  icon: React.ReactNode;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    titleKey: "achievement1.title",
    day: 30,
    month: 1, // January
    year: 2024,
    descriptionKey: "achievement1.description",
    icon: <Flag size={24} />,
  },
  {
    id: 2,
    titleKey: "achievement2.title",
    day: 2,
    month: 2, // February
    year: 2024,
    descriptionKey: "achievement2.description",
    icon: <Trophy size={24} />,
  },
  {
    id: 3,
    titleKey: "achievement3.title",
    day: 15,
    month: 4, // April
    year: 2024,
    descriptionKey: "achievement3.description",
    icon: <Award size={24} />,
  },
  {
    id: 4,
    titleKey: "achievement4.title",
    day: 11,
    month: 7, // July
    year: 2024,
    descriptionKey: "achievement4.description",
    icon: <Medal size={24} />,
  },
  {
    id: 5,
    titleKey: "achievement5.title",
    day: 25,
    month: 9, // September
    year: 2024,
    descriptionKey: "achievement5.description",
    icon: <Star size={24} />,
  },
  {
    id: 6,
    titleKey: "achievement6.title",
    day: 0, // Special case for "Present"
    month: 0,
    year: 0,
    descriptionKey: "achievement6.description",
    icon: <Target size={24} />,
  },
];

const Achievements = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const { isDarkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

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
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".achievement-item");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Format date based on language
  const formatDate = (day: number, month: number, year: number) => {
    // Special case for "Present"
    if (day === 0 && month === 0 && year === 0) {
      return language === "en" ? "Present" : "Đến nay";
    }

    // Month names in English and Vietnamese
    const monthNamesEN = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // In Vietnamese, months are typically represented as "Tháng X"
    if (language === "en") {
      return `${monthNamesEN[month - 1]} ${day}, ${year}`;
    } else {
      return `${day} Tháng ${month}, ${year}`;
    }
  };

  return (
    <section
      id="achievements"
      className={cn("py-24 relative", isDarkMode ? "bg-gray-50" : "")}
    >
      <div className="section-container">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold text-center mb-16",
            isDarkMode ? "text-orange-500" : "gold-gradient-text"
          )}
        >
          {getText("achievements", language)}
        </h2>

        <div className="max-w-4xl mx-auto">
          <div
            className={cn(
              "relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5",
              isDarkMode
                ? "before:bg-gradient-to-b before:from-transparent before:via-orange-300/30 before:to-transparent"
                : "before:bg-gradient-to-b before:from-transparent before:via-clan-gold/30 before:to-transparent"
            )}
          >
            {ACHIEVEMENTS.map((achievement) => (
              <div
                key={achievement.id}
                data-id={achievement.id}
                className={cn(
                  "achievement-item relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group",
                  "mb-12 last:mb-0 transition-opacity duration-500",
                  visibleItems.includes(achievement.id)
                    ? "opacity-100"
                    : "opacity-0"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300",
                    isDarkMode
                      ? "border-gray-300 bg-gray-100 group-hover:bg-orange-100"
                      : "border-white/10 bg-clan-dark-accent group-hover:bg-clan-gold/20"
                  )}
                >
                  <span
                    className={
                      isDarkMode ? "text-orange-500" : "text-clan-gold"
                    }
                  >
                    {achievement.icon}
                  </span>
                </div>

                <div
                  className={cn(
                    "w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl transition-all duration-300",
                    isDarkMode
                      ? "bg-white border border-gray-200 hover:border-orange-200 hover:shadow-md"
                      : "glass-card card-hover"
                  )}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <h3
                      className={cn(
                        "text-lg font-bold",
                        isDarkMode ? "text-gray-800" : "text-white"
                      )}
                    >
                      {getText(achievement.titleKey, language)}
                    </h3>
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        isDarkMode
                          ? "text-gray-500 bg-gray-100 border border-gray-200"
                          : "text-white/50 bg-white/5 border border-white/10"
                      )}
                    >
                      {formatDate(
                        achievement.day,
                        achievement.month,
                        achievement.year
                      )}
                    </span>
                  </div>
                  <p className={isDarkMode ? "text-gray-600" : "text-white/70"}>
                    {getText(achievement.descriptionKey, language)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
