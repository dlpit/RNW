import { useState, useContext, useEffect } from "react";
import { Shield, User, Mail, MessageSquare, Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  updateFormData,
  resetForm,
  submitApplication,
} from "@/redux/recruitment/recruitmentSlice";
import { LanguageContext } from "@/Provider/language";
import { ThemeContext } from "@/theme";
import { getText } from "@/lib/translations";
import { validateRecruitmentForm } from "@/utils/validators";

const formatNumberWithSemicolons = (value: string): string => {
  // Remove all non-digit characters first
  const digitsOnly = value.replace(/\D/g, "");

  // Format with semicolons for thousand separators
  if (digitsOnly) {
    return digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ";");
  }

  return digitsOnly;
};

const formatNumberWithDots = (value: string): string => {
  // Remove all non-digit characters first
  const digitsOnly = value.replace(/\D/g, "");

  // Format with dots for thousand separators
  if (digitsOnly) {
    return digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return digitsOnly;
};

const RecruitmentRequirements = () => {
  const { language } = useContext(LanguageContext);
  const { isDarkMode } = useContext(ThemeContext);

  const requirements = [
    {
      text: getText("reqT5Active", language),
      icon: <Shield size={18} />,
    },
    {
      text: getText("reqCombatSpirit", language),
      icon: <Shield size={18} />,
    },
    {
      text: getText("reqObedience", language),
      icon: <Check size={18} />,
    },
    {
      text: getText("reqContribute", language),
      icon: <User size={18} />,
    },
    {
      text: getText("reqFriendly", language),
      icon: <MessageSquare size={18} />,
    },
    {
      text: getText("reqDiscord", language),
      icon: <MessageSquare size={18} />,
    },
  ];

  return (
    <div
      className={cn(
        "p-6 rounded-xl shadow-lg",
        isDarkMode
          ? "bg-gray-50 border border-gray-200" // Match Stats.tsx theming
          : "glass-card"
      )}
    >
      <h3
        className={cn(
          "text-xl font-semibold mb-4",
          isDarkMode ? "text-gray-800" : "text-white"
        )}
      >
        {getText("requirements", language)}
      </h3>
      <ul className="space-y-3">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-start">
            <span
              className={cn(
                "mr-3 flex-shrink-0 mt-1",
                isDarkMode ? "text-orange-500" : "text-clan-gold"
              )}
            >
              {req.icon}
            </span>
            <span className={isDarkMode ? "text-gray-600" : "text-white/80"}>
              {req.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const RecruitmentBenefits = () => {
  const { language } = useContext(LanguageContext);
  const { isDarkMode } = useContext(ThemeContext);

  const benefits = [
    getText("benefitTraining", language),
    getText("benefitHighOnline", language),
    getText("benefitRewards", language),
    getText("benefitPriority", language),
    getText("benefitSupport", language),
    getText("benefitCommunity", language),
  ];

  return (
    <div
      className={cn(
        "p-6 rounded-xl shadow-lg",
        isDarkMode ? "bg-white border border-gray-200" : "glass-card"
      )}
    >
      <h3
        className={cn(
          "text-xl font-semibold mb-4",
          isDarkMode ? "text-gray-800" : "text-white"
        )}
      >
        {getText("benefits", language)}
      </h3>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <span
              className={cn(
                "mr-3 mt-1",
                isDarkMode ? "text-orange-500" : "text-clan-gold"
              )}
            >
              •
            </span>
            <span className={isDarkMode ? "text-gray-600" : "text-white/80"}>
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Recruitment = () => {
  const dispatch = useAppDispatch();
  const { formData, isSubmitting, isSubmitted, error } = useAppSelector(
    (state) => state.recruitment
  );
  const { language } = useContext(LanguageContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Apply formatting for power and killPoint fields
    if (name === "power" || name === "killPoint") {
      const formattedValue = formatNumberWithDots(value);
      dispatch(updateFormData({ [name]: formattedValue }));
    } else {
      dispatch(updateFormData({ [name]: value }));
    }
  };

  useEffect(() => {
    const validationResults = validateRecruitmentForm(formData, language);

    const errors: Record<string, string> = {};
    let formIsValid = true;

    Object.entries(validationResults).forEach(([field, result]) => {
      if (!result.isValid) {
        formIsValid = false;
        if (touchedFields[field]) {
          errors[field] =
            "errorMessage" in result ? result.errorMessage || "" : "";
        }
      }
    });

    setValidationErrors(errors);
    setIsFormValid(formIsValid);
  }, [formData, touchedFields, language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFieldsTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach((field) => {
      allFieldsTouched[field] = true;
    });
    setTouchedFields(allFieldsTouched);

    const validationResults = validateRecruitmentForm(formData, language);
    const errors: Record<string, string> = {};
    let formIsValid = true;

    Object.entries(validationResults).forEach(([field, result]) => {
      if (!result.isValid) {
        formIsValid = false;
        errors[field] =
          "errorMessage" in result ? result.errorMessage || "" : "";
      }
    });

    setValidationErrors(errors);

    if (!formIsValid) {
      return;
    }

    dispatch(submitApplication(formData));
  };

  const renderValidationError = (fieldName: string) => {
    if (validationErrors[fieldName] && touchedFields[fieldName]) {
      return (
        <p
          className={
            isDarkMode
              ? "text-red-400 text-xs mt-1"
              : "text-red-500 text-xs mt-1"
          }
        >
          {validationErrors[fieldName]}
        </p>
      );
    }
    return null;
  };

  return (
    <section id="recruitment" className="py-24 relative">
      <div className="section-container">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold mb-4 text-center",
            isDarkMode ? "text-orange-500" : "gold-gradient-text"
          )}
        >
          {getText("joinOurClan", language)}
        </h2>
        <p
          className={cn(
            "text-center max-w-2xl mx-auto mb-16",
            isDarkMode ? "text-gray-500" : "text-white/85"
          )}
        >
          {getText("recruitmentDescription", language)}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <RecruitmentRequirements />
            <RecruitmentBenefits />
          </div>

          <div className="lg:col-span-2">
            <div
              className={cn(
                "p-6 rounded-xl shadow-lg",
                isDarkMode ? "bg-white border border-gray-200" : "glass-card"
              )}
            >
              <h3
                className={cn(
                  "text-xl font-semibold mb-6",
                  isDarkMode ? "text-gray-800" : "text-white"
                )}
              >
                {getText("applicationForm", language)}
              </h3>

              {error && (
                <div
                  className={cn(
                    "border rounded-lg p-4 mb-4 text-center",
                    isDarkMode
                      ? "bg-red-50 border-red-200 text-red-700"
                      : "bg-red-500/10 border-red-500/30 text-white/90"
                  )}
                >
                  <p>{error}</p>
                </div>
              )}

              {isSubmitted ? (
                <div
                  className={cn(
                    "rounded-lg p-6 text-center animate-scale-in",
                    isDarkMode
                      ? "bg-amber-50 border border-amber-200"
                      : "bg-clan-gold/10 border border-clan-gold/30"
                  )}
                >
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-16 h-16 rounded-full mb-4",
                      isDarkMode
                        ? "bg-amber-100 text-amber-600"
                        : "bg-clan-gold/20 text-clan-gold"
                    )}
                  >
                    <Check size={32} />
                  </div>
                  <h4
                    className={cn(
                      "text-xl font-semibold mb-2",
                      isDarkMode ? "text-gray-800" : "text-white"
                    )}
                  >
                    {getText("applicationSubmitted", language)}
                  </h4>
                  <p className={isDarkMode ? "text-gray-600" : "text-white/70"}>
                    {getText("applicationThankYou", language)}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="ingame"
                        className={cn(
                          "block mb-1",
                          isDarkMode ? "text-gray-600" : "text-white/70"
                        )}
                      >
                        {getText("inGameName", language)}
                      </label>
                      <input
                        id="ingame"
                        name="ingame"
                        type="text"
                        required
                        value={formData.ingame}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2",
                          isDarkMode
                            ? "bg-gray-50 text-gray-800 focus:ring-orange-500/50"
                            : "bg-clan-dark-accent text-white focus:ring-clan-gold/50",
                          validationErrors.ingame && touchedFields.ingame
                            ? isDarkMode
                              ? "border-red-500"
                              : "border-red-400"
                            : isDarkMode
                            ? "border border-gray-200"
                            : "border border-white/10"
                        )}
                        placeholder={getText("placeholderName", language)}
                      />
                      {renderValidationError("ingame")}
                    </div>
                    <div>
                      <label
                        htmlFor="idIngame"
                        className={cn(
                          "block mb-1",
                          isDarkMode ? "text-gray-600" : "text-white/70"
                        )}
                      >
                        {getText("inGameID", language)}
                      </label>
                      <input
                        id="idIngame"
                        name="idIngame"
                        type="text"
                        required
                        value={formData.idIngame}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2",
                          isDarkMode
                            ? "bg-gray-50 text-gray-800 focus:ring-orange-500/50"
                            : "bg-clan-dark-accent text-white focus:ring-clan-gold/50",
                          validationErrors.idIngame && touchedFields.idIngame
                            ? isDarkMode
                              ? "border-red-500"
                              : "border-red-400"
                            : isDarkMode
                            ? "border border-gray-200"
                            : "border border-white/10"
                        )}
                        placeholder={getText("placeholderID", language)}
                      />
                      {renderValidationError("idIngame")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="power"
                        className={cn(
                          "block mb-1",
                          isDarkMode ? "text-gray-600" : "text-white/70"
                        )}
                      >
                        {getText("powerLevel", language)}
                      </label>
                      <input
                        id="power"
                        name="power"
                        type="text"
                        required
                        value={formData.power}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2",
                          isDarkMode
                            ? "bg-gray-50 text-gray-800 focus:ring-orange-500/50"
                            : "bg-clan-dark-accent text-white focus:ring-clan-gold/50",
                          validationErrors.power && touchedFields.power
                            ? isDarkMode
                              ? "border-red-500"
                              : "border-red-400"
                            : isDarkMode
                            ? "border border-gray-200"
                            : "border border-white/10"
                        )}
                        placeholder={getText("placeholderPower", language)}
                      />
                      {renderValidationError("power")}
                    </div>
                    <div>
                      <label
                        htmlFor="killPoint"
                        className={cn(
                          "block mb-1",
                          isDarkMode ? "text-gray-600" : "text-white/70"
                        )}
                      >
                        {getText("killPoints", language)}
                      </label>
                      <input
                        id="killPoint"
                        name="killPoint"
                        type="text"
                        required
                        value={formData.killPoint}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2",
                          isDarkMode
                            ? "bg-gray-50 text-gray-800 focus:ring-orange-500/50"
                            : "bg-clan-dark-accent text-white focus:ring-clan-gold/50",
                          validationErrors.killPoint && touchedFields.killPoint
                            ? isDarkMode
                              ? "border-red-500"
                              : "border-red-400"
                            : isDarkMode
                            ? "border border-gray-200"
                            : "border border-white/10"
                        )}
                        placeholder={getText("placeholderKP", language)}
                      />
                      {renderValidationError("killPoint")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className={cn(
                          "block mb-1",
                          isDarkMode ? "text-gray-600" : "text-white/70"
                        )}
                      >
                        {getText("email", language)}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2",
                          isDarkMode
                            ? "bg-gray-50 text-gray-800 focus:ring-orange-500/50"
                            : "bg-clan-dark-accent text-white focus:ring-clan-gold/50",
                          validationErrors.email && touchedFields.email
                            ? isDarkMode
                              ? "border-red-500"
                              : "border-red-400"
                            : isDarkMode
                            ? "border border-gray-200"
                            : "border border-white/10"
                        )}
                        placeholder={getText("placeholderEmail", language)}
                      />
                      {renderValidationError("email")}
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className={cn(
                          "block mb-1",
                          isDarkMode ? "text-gray-600" : "text-white/70"
                        )}
                      >
                        {getText("country", language)}
                      </label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2",
                          isDarkMode
                            ? "bg-gray-50 text-gray-800 focus:ring-orange-500/50"
                            : "bg-clan-dark-accent text-white focus:ring-clan-gold/50",
                          validationErrors.country && touchedFields.country
                            ? isDarkMode
                              ? "border-red-500"
                              : "border-red-400"
                            : isDarkMode
                            ? "border border-gray-200"
                            : "border border-white/10"
                        )}
                        placeholder={getText("placeholderCountry", language)}
                      />
                      {renderValidationError("country")}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="language"
                      className={cn(
                        "block mb-1",
                        isDarkMode ? "text-gray-600" : "text-white/70"
                      )}
                    >
                      {getText("preferredLanguage", language)}
                    </label>
                    <div className="relative">
                      <select
                        id="language"
                        name="language"
                        required
                        value={formData.language}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 appearance-none pr-10",
                          isDarkMode
                            ? "bg-gray-50 text-gray-800 focus:ring-orange-500/50"
                            : "bg-clan-dark-accent text-white focus:ring-clan-gold/50",
                          validationErrors.language && touchedFields.language
                            ? isDarkMode
                              ? "border-red-500"
                              : "border-red-400"
                            : isDarkMode
                            ? "border border-gray-200"
                            : "border border-white/10"
                        )}
                      >
                        <option value="Vietnamese">
                          {getText("langVietnamese", language)}
                        </option>
                        <option value="English">
                          {getText("langEnglish", language)}
                        </option>
                        <option value="Chinese">
                          {getText("langChinese", language)}
                        </option>
                        <option value="Russian">
                          {getText("langRussian", language)}
                        </option>
                        <option value="Other">
                          {getText("langOther", language)}
                        </option>
                      </select>
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4",
                          isDarkMode ? "text-gray-500" : "text-white/70"
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                    {renderValidationError("language")}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !isFormValid}
                      className={cn(
                        "w-full py-3 rounded-lg font-semibold transition-all duration-300",
                        "flex items-center justify-center",
                        isDarkMode
                          ? "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg"
                          : "bg-gradient-gold text-clan-dark hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]",
                        (isSubmitting || !isFormValid) &&
                          "opacity-70 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className={`animate-spin -ml-1 mr-2 h-4 w-4 ${
                              isDarkMode ? "text-white" : "text-clan-dark"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {getText("submitting", language)}
                        </>
                      ) : (
                        <>
                          {getText("submitApplication", language)}{" "}
                          <Send size={16} className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recruitment;
