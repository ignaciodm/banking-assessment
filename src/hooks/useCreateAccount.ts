import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { createAccount } from '~/api/createAccount';
import type { CreateAccountPayload, CreateAccountResponse } from '~/types/account';
import { useAccountContext } from '~/contexts/AccountContext';

/**
 * React Query hook for creating a bank account
 */
export function useCreateAccount() {
  const navigate = useNavigate();
  const { setSuccessMessage } = useAccountContext();

  return useMutation<CreateAccountResponse, Error, CreateAccountPayload>({
    mutationFn: async (payload: CreateAccountPayload) => {
      return await createAccount({ data: payload });
    },
    onSuccess: (data) => {
      // Set success message in context
      setSuccessMessage(data.message);
      
      // Navigate to homepage
      navigate({ to: '/', replace: true });
    },
    onError: (error) => {
      // TODO: In production, implement proper error handling
      console.error('Failed to create account:', error);
    },
  });
}
