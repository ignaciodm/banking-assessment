import React, { createContext, useContext, useState, useCallback } from 'react';

interface AccountContextValue {
  successMessage: string | null;
  setSuccessMessage: (message: string | null) => void;
  clearSuccessMessage: () => void;
}

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [successMessage, setSuccessMessageState] = useState<string | null>(null);

  const setSuccessMessage = useCallback((message: string | null) => {
    setSuccessMessageState(message);
  }, []);

  const clearSuccessMessage = useCallback(() => {
    setSuccessMessageState(null);
  }, []);

  return (
    <AccountContext.Provider
      value={{
        successMessage,
        setSuccessMessage,
        clearSuccessMessage,
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
