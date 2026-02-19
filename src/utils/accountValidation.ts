import type { CreateAccountFormData } from '~/types/account';
import {
  validateRequired,
  validateStringLength,
  validateMinNumber,
  validateMaxNumber,
  combineValidations,
} from '~/utils/validation';
import { ACCOUNT_VALIDATION, VALIDATION_MESSAGES } from '~/constants/validation';

type FormErrors = Partial<Record<keyof CreateAccountFormData, string>>;

/**
 * Validates account creation form data
 */
export function validateAccountForm(data: CreateAccountFormData): FormErrors {
  const errors: FormErrors = {};

  // Validate nickname: required + 5-30 characters
  const nicknameError = combineValidations(
    validateRequired(data.nickname, VALIDATION_MESSAGES.NICKNAME_REQUIRED),
    validateStringLength(data.nickname, {
      min: ACCOUNT_VALIDATION.NICKNAME_MIN_LENGTH,
      max: ACCOUNT_VALIDATION.NICKNAME_MAX_LENGTH,
      minMessage: VALIDATION_MESSAGES.NICKNAME_MIN,
      maxMessage: VALIDATION_MESSAGES.NICKNAME_MAX,
    })
  );
  if (nicknameError) errors.nickname = nicknameError;

  // Validate savings goal for savings account
  if (data.accountType === 'savings') {
    const savingsGoalError = combineValidations(
      validateRequired(data.savingsGoal, VALIDATION_MESSAGES.SAVINGS_GOAL_REQUIRED),
      validateMinNumber(
        data.savingsGoal,
        ACCOUNT_VALIDATION.SAVINGS_GOAL_MIN,
        VALIDATION_MESSAGES.SAVINGS_GOAL_MIN
      ),
      validateMaxNumber(
        data.savingsGoal,
        ACCOUNT_VALIDATION.SAVINGS_GOAL_MAX,
        VALIDATION_MESSAGES.SAVINGS_GOAL_MAX
      )
    );
    if (savingsGoalError) errors.savingsGoal = savingsGoalError;
  }

  return errors;
}
