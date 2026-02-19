import React, { useEffect } from 'react';
import { useAccountContext } from '~/contexts/AccountContext';

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

  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <strong className="font-bold">Success! </strong>
      <span className="block sm:inline">
        Your {accountTypeLabel} "{createdAccount.nickname}"{savingsGoalText} has been created successfully.
      </span>
      <button
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        onClick={clearCreatedAccount}
        aria-label="Close"
      >
        <span className="text-2xl">&times;</span>
      </button>
    </div>
  );
}
