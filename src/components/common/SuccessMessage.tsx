import React, { useEffect } from 'react';
import { useAccountContext } from '~/contexts/AccountContext';

export function SuccessMessage() {
  const { successMessage, clearSuccessMessage } = useAccountContext();

  useEffect(() => {
    if (successMessage) {
      // Auto-clear message after 5 seconds
      const timer = setTimeout(() => {
        clearSuccessMessage();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccessMessage]);

  if (!successMessage) return null;

  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <strong className="font-bold">Success! </strong>
      <span className="block sm:inline">{successMessage}</span>
      <button
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        onClick={clearSuccessMessage}
        aria-label="Close"
      >
        <span className="text-2xl">&times;</span>
      </button>
    </div>
  );
}
