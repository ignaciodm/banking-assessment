import { useState } from 'react';

/**
 * Generic form validation hook
 * Manages validation errors and provides utilities for error handling
 */
export function useFormValidation<TFormData extends Record<string, any>>() {
  const [errors, setErrors] = useState<Partial<Record<keyof TFormData, string>>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  /**
   * Clear error for a specific field
   */
  const clearFieldError = (fieldName: keyof TFormData) => {
    if (hasSubmitted && errors[fieldName]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    }
  };

  /**
   * Set validation errors
   */
  const setValidationErrors = (newErrors: Partial<Record<keyof TFormData, string>>) => {
    setErrors(newErrors);
  };

  /**
   * Clear all errors
   */
  const clearAllErrors = () => {
    setErrors({});
  };

  /**
   * Mark form as submitted (enables error clearing on field change)
   */
  const markAsSubmitted = () => {
    setHasSubmitted(true);
  };

  return {
    errors,
    hasSubmitted,
    clearFieldError,
    setValidationErrors,
    clearAllErrors,
    markAsSubmitted,
  };
}
