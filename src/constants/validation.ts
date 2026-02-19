/**
 * Validation constants for account creation
 */

export const ACCOUNT_VALIDATION = {
  NICKNAME_MIN_LENGTH: 5,
  NICKNAME_MAX_LENGTH: 30,
  SAVINGS_GOAL_MIN: 0,
  SAVINGS_GOAL_MAX: 1_000_000,
} as const;

export const VALIDATION_MESSAGES = {
  NICKNAME_REQUIRED: 'Account nickname is required',
  NICKNAME_MIN: `Account nickname must be at least ${5} characters`,
  NICKNAME_MAX: `Account nickname must be no more than ${30} characters`,
  SAVINGS_GOAL_REQUIRED: 'Savings goal is required for savings accounts',
  SAVINGS_GOAL_MIN: 'Savings goal cannot be negative',
  SAVINGS_GOAL_MAX: 'Savings goal cannot exceed $1,000,000',
} as const;
