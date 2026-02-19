/**
 * Account types for form and API
 */

export type AccountType = 'everyday' | 'savings';

export interface CreateAccountFormData {
  nickname: string;
  accountType: AccountType;
  savingsGoal?: number;
}

export interface CreateAccountPayload {
  nickname: string;
  accountType: AccountType;
  savingsGoal?: number;
}
