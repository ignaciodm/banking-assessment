/**
 * Generic validation utilities
 * Hand-coded validation functions that mimic professional validation libraries
 */

export type ValidationResult = string | undefined;

export interface ValidationRule<T = any> {
  validate: (value: T) => ValidationResult;
}

/**
 * Validates that a value is not empty
 * Handles NaN for number inputs
 */
export function validateRequired(value: any, message = 'This field is required'): ValidationResult {
  if (value === undefined || value === null || value === '' || Number.isNaN(value)) {
    return message;
  }
  return undefined;
}

/**
 * Validates string length (min and/or max)
 */
export function validateStringLength(
  value: string,
  options: { min?: number; max?: number; minMessage?: string; maxMessage?: string }
): ValidationResult {
  if (!value) return undefined;

  const { min, max, minMessage, maxMessage } = options;

  if (min !== undefined && value.length < min) {
    return minMessage || `Must be at least ${min} characters`;
  }

  if (max !== undefined && value.length > max) {
    return maxMessage || `Must be no more than ${max} characters`;
  }

  return undefined;
}

/**
 * Validates that a number does not exceed a maximum value
 */
export function validateMaxNumber(
  value: number | undefined,
  max: number,
  message?: string
): ValidationResult {
  if (value === undefined || value === null || Number.isNaN(value)) return undefined;

  if (value > max) {
    return message || `Cannot exceed ${max.toLocaleString()}`;
  }

  return undefined;
}

/**
 * Validates that a number meets a minimum value
 */
export function validateMinNumber(
  value: number | undefined,
  min: number,
  message?: string
): ValidationResult {
  if (value === undefined || value === null || Number.isNaN(value)) return undefined;

  if (value < min) {
    return message || `Must be at least ${min.toLocaleString()}`;
  }

  return undefined;
}

/**
 * Combines multiple validation rules
 */
export function combineValidations(...validations: (ValidationResult | undefined)[]): ValidationResult {
  for (const error of validations) {
    if (error) return error;
  }
  return undefined;
}
