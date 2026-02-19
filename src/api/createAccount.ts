import { createServerFn } from '@tanstack/react-start';
import type { CreateAccountPayload, CreateAccountResponse } from '~/types/account';

/**
 * Server function to create a bank account
 * This is a stub implementation that simulates an API call
 */
export const createAccount = createServerFn({ method: 'POST' })
  .inputValidator((data: CreateAccountPayload) => data)
  .handler(async ({ data }) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Stub implementation - always succeeds
    // TODO: In production, this would call a real backend API
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
