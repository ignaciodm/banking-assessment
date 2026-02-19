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

export interface CreateAccountResponse {
  success: true;
  accountId: string;
  message: string;
  account: {
    nickname: string;
    accountType: AccountType;
    savingsGoal?: number;
  };
}

export interface CreateAccountError {
  success: false;
  error: string;
  message: string;
}
