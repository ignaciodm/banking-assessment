import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { createAccount } from '~/api/createAccount';
import type { CreateAccountPayload, CreateAccountResponse } from '~/types/account';
import { useAccountContext } from '~/contexts/AccountContext';

/**
 * React Query hook for creating a bank account
 * Handles success and error states gracefully
 */
export function useCreateAccount() {
  const navigate = useNavigate();
  const { setCreatedAccount } = useAccountContext();

  return useMutation<CreateAccountResponse, Error, CreateAccountPayload>({
    mutationFn: async (payload: CreateAccountPayload) => {
      return await createAccount({ data: payload });
    },
    onSuccess: (data) => {
      // Set success message in context
      setCreatedAccount(data.account);
      
      // Navigate to homepage only on success
      navigate({ to: '/', replace: true });
    },
    onError: (error) => {
      // Error is handled in the component via error state
      // Do NOT navigate on error - stay on the form page
      console.error('Failed to create account:', error);
    },
  });
}
