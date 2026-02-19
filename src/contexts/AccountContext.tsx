import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AccountType } from '~/types/account';

interface CreatedAccount {
  nickname: string;
  accountType: AccountType;
  savingsGoal?: number;
}

interface AccountContextValue {
  createdAccount: CreatedAccount | null;
  setCreatedAccount: (account: CreatedAccount | null) => void;
  clearCreatedAccount: () => void;
}

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [createdAccount, setCreatedAccountState] = useState<CreatedAccount | null>(null);

  const setCreatedAccount = useCallback((account: CreatedAccount | null) => {
    setCreatedAccountState(account);
  }, []);

  const clearCreatedAccount = useCallback(() => {
    setCreatedAccountState(null);
  }, []);

  return (
    <AccountContext.Provider
      value={{
        createdAccount,
        setCreatedAccount,
        clearCreatedAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccountContext must be used within AccountProvider');
  }
  return context;
}
