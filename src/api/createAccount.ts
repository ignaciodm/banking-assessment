import { createServerFn } from '@tanstack/react-start';
import type { CreateAccountPayload, CreateAccountResponse, CreateAccountError } from '~/types/account';

/**
 * Server function to create a bank account
 * This is a stub implementation that simulates an API call
 * Randomly fails 30% of the time to demonstrate error handling
 */
export const createAccount = createServerFn({ method: 'POST' })
  .inputValidator((data: CreateAccountPayload) => data)
  .handler(async ({ data }) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Randomly fail 30% of the time
    const shouldFail = Math.random() < 0.3;

    if (shouldFail) {
      // Simulate API error
      const errorResponse: CreateAccountError = {
        success: false,
        error: 'ACCOUNT_CREATION_FAILED',
        message: 'Failed to create account. Please try again.',
      };
      
      // Throw error to trigger React Query's onError
      throw new Error(errorResponse.message);
    }

    // Success case (70% of the time)
    const response: CreateAccountResponse = {
      success: true,
      accountId: `acc_${Math.random().toString(36).substring(2, 11)}`,
      message: 'Account created successfully',
      account: {
        nickname: data.nickname,
        accountType: data.accountType,
        savingsGoal: data.savingsGoal,
      },
    };

    return response;
  });
