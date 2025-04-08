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
import { getText } from "@/lib/translations";
import { validateRecruitmentForm } from "@/utils/validators";

const RecruitmentRequirements = () => {
  const { language } = useContext(LanguageContext);

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
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        {getText("requirements", language)}
      </h3>
      <ul className="space-y-3">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-start text-white/80">
            <span className="text-clan-gold mr-3 flex-shrink-0 mt-1">
              {req.icon}
            </span>
            <span>{req.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
const RecruitmentBenefits = () => {
  const { language } = useContext(LanguageContext);

  const benefits = [
    getText("benefitTraining", language),
    getText("benefitHighOnline", language),
    getText("benefitRewards", language),
    getText("benefitPriority", language),
    getText("benefitSupport", language),
    getText("benefitCommunity", language),
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        {getText("benefits", language)}
      </h3>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start text-white/80">
            <span className="text-clan-gold mr-3 mt-1">•</span>
            <span>{benefit}</span>
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

    dispatch(updateFormData({ [name]: value }));
  };

  useEffect(() => {
    const validationResults = validateRecruitmentForm(formData, language);

    const errors: Record<string, string> = {};
    let formIsValid = true;

    Object.entries(validationResults).forEach(([field, result]) => {
      if (!result.isValid) {
        formIsValid = false;
        if (touchedFields[field]) {
          errors[field] = result.errorMessage || "";
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
        errors[field] = result.errorMessage || "";
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
        <p className="text-red-400 text-xs mt-1">
          {validationErrors[fieldName]}
        </p>
      );
    }
    return null;
  };

  return (
    <section id="recruitment" className="py-24 relative">
      <div className="section-container">
        <h2 className="section-title text-center mb-4">
          {getText("joinOurClan", language)}
        </h2>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-16">
          {getText("recruitmentDescription", language)}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <RecruitmentRequirements />
            <RecruitmentBenefits />
          </div>

          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                {getText("applicationForm", language)}
              </h3>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4 text-center">
                  <p className="text-white/90">{error}</p>
                </div>
              )}

              {isSubmitted ? (
                <div className="bg-clan-gold/10 border border-clan-gold/30 rounded-lg p-6 text-center animate-scale-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-clan-gold/20 text-clan-gold mb-4">
                    <Check size={32} />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {getText("applicationSubmitted", language)}
                  </h4>
                  <p className="text-white/70">
                    {getText("applicationThankYou", language)}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="ingame"
                        className="block text-white/70 mb-1"
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
                          "w-full px-4 py-2 bg-clan-dark-accent border rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white",
                          validationErrors.ingame
                            ? "border-red-400"
                            : "border-white/10"
                        )}
                        placeholder={getText("placeholderName", language)}
                      />
                      {renderValidationError("ingame")}
                    </div>
                    <div>
                      <label
                        htmlFor="idIngame"
                        className="block text-white/70 mb-1"
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
                          "w-full px-4 py-2 bg-clan-dark-accent border rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white",
                          validationErrors.idIngame
                            ? "border-red-400"
                            : "border-white/10"
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
                        className="block text-white/70 mb-1"
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
                          "w-full px-4 py-2 bg-clan-dark-accent border rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white",
                          validationErrors.power
                            ? "border-red-400"
                            : "border-white/10"
                        )}
                        placeholder={getText("placeholderPower", language)}
                      />
                      {renderValidationError("power")}
                    </div>
                    <div>
                      <label
                        htmlFor="killPoint"
                        className="block text-white/70 mb-1"
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
                          "w-full px-4 py-2 bg-clan-dark-accent border rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white",
                          validationErrors.killPoint
                            ? "border-red-400"
                            : "border-white/10"
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
                        className="block text-white/70 mb-1"
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
                          "w-full px-4 py-2 bg-clan-dark-accent border rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white",
                          validationErrors.email
                            ? "border-red-400"
                            : "border-white/10"
                        )}
                        placeholder={getText("placeholderEmail", language)}
                      />
                      {renderValidationError("email")}
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-white/70 mb-1"
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
                          "w-full px-4 py-2 bg-clan-dark-accent border rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white",
                          validationErrors.country
                            ? "border-red-400"
                            : "border-white/10"
                        )}
                        placeholder={getText("placeholderCountry", language)}
                      />
                      {renderValidationError("country")}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="language"
                      className="block text-white/70 mb-1"
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
                          "w-full px-4 py-2 bg-clan-dark-accent border rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white appearance-none pr-10",
                          validationErrors.language
                            ? "border-red-400"
                            : "border-white/10"
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
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-white/70">
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
                        "bg-gradient-gold text-clan-dark hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]",
                        (isSubmitting || !isFormValid) &&
                          "opacity-70 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-clan-dark"
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
