import { getText } from "@/lib/translations";

type ValidationResult = {
  isValid: boolean;
  errorMessage?: string;
};

/**
 * Validates the in-game name
 */
export const validateIngameName = (value: string, language: "en" | "vi"): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, errorMessage: getText("validation.required" as any, language) };
  }
  
  if (value.length < 2 || value.length > 30) {
    return { isValid: false, errorMessage: getText("validation.ingame.length" as any, language) };
  }
  
  return { isValid: true };
};

/**
 * Validates the in-game ID
 */
export const validateIngameId = (value: string, language: "en" | "vi"): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, errorMessage: getText("validation.required" as any, language) };
  }
  
  // Assuming the ID should be alphanumeric
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(value)) {
    return { isValid: false, errorMessage: getText("validation.idIngame.format" as any, language) };
  }
  
  return { isValid: true };
};

/**
 * Validates a numeric power value
 */
export const validatePower = (value: string, language: "en" | "vi"): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, errorMessage: getText("validation.required" as any, language) };
  }
  
  // Remove commas for validation
  const numericValue = parseInt(value.replace(/,/g, ''), 10);
  
  if (isNaN(numericValue)) {
    return { isValid: false, errorMessage: getText("validation.power.numeric" as any, language) };
  }
  
  if (numericValue < 10000000) {
    return { isValid: false, errorMessage: getText("validation.power.min" as any, language) };
  }
  
  return { isValid: true };
};

/**
 * Validates a numeric kill point value
 */
export const validateKillPoint = (value: string, language: "en" | "vi"): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, errorMessage: getText("validation.required" as any, language) };
  }
  
  // Remove commas for validation
  const numericValue = parseInt(value.replace(/,/g, ''), 10);
  
  if (isNaN(numericValue)) {
    return { isValid: false, errorMessage: getText("validation.killPoint.numeric" as any, language) };
  }
  
  if (numericValue < 10000) {
    return { isValid: false, errorMessage: getText("validation.killPoint.min" as any, language) };
  }
  
  return { isValid: true };
};

/**
 * Validates an email address
 */
export const validateEmail = (value: string, language: "en" | "vi"): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, errorMessage: getText("validation.required" as any, language) };
  }
  
  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return { isValid: false, errorMessage: getText("validation.email.format" as any, language) };
  }
  
  return { isValid: true };
};

/**
 * Validates the country field
 */
export const validateCountry = (value: string, language: "en" | "vi"): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, errorMessage: getText("validation.required" as any, language) };
  }
  
  return { isValid: true };
};

/**
 * Validates the entire form
 */
export const validateRecruitmentForm = (
  formData: {
    ingame: string;
    idIngame: string;
    power: string;
    killPoint: string;
    email: string;
    country: string;
    language: string;
  }, 
  currentLanguage: "en" | "vi"
) => {
  return {
    ingame: validateIngameName(formData.ingame, currentLanguage),
    idIngame: validateIngameId(formData.idIngame, currentLanguage),
    power: validatePower(formData.power, currentLanguage),
    killPoint: validateKillPoint(formData.killPoint, currentLanguage),
    email: validateEmail(formData.email, currentLanguage),
    country: validateCountry(formData.country, currentLanguage),
    language: { isValid: true } // Language always valid as it's a select with predefined options
  };
};