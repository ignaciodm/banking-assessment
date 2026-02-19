import React, { useEffect } from 'react';
import { useAccountContext } from '~/contexts/AccountContext';
import { Alert } from './Alert';

export function SuccessMessage() {
  const { createdAccount, clearCreatedAccount } = useAccountContext();

  useEffect(() => {
    if (createdAccount) {
      // Auto-clear message after 5 seconds
      const timer = setTimeout(() => {
        clearCreatedAccount();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [createdAccount, clearCreatedAccount]);

  if (!createdAccount) return null;

  // Format the success message with account details
  const accountTypeLabel = createdAccount.accountType === 'savings' ? 'Savings Account' : 'Everyday Account';
  const savingsGoalText = createdAccount.savingsGoal 
    ? ` with a savings goal of $${createdAccount.savingsGoal.toLocaleString()}` 
    : '';

  const message = `Your ${accountTypeLabel} "${createdAccount.nickname}"${savingsGoalText} has been created successfully.`;

  return (
    <Alert
      variant="success"
      message={message}
      onClose={clearCreatedAccount}
    />
  );
}
