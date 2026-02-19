import { useForm } from 'react-hook-form';
import type { CreateAccountFormData } from '~/types/account';
import { FormField } from '~/components/common/FormField';
import { Alert } from '~/components/common/Alert';
import { useFormValidation } from '~/hooks/useFormValidation';
import { validateAccountForm } from '~/utils/accountValidation';
import { useCreateAccount } from '~/hooks/useCreateAccount';

export function CreateAccountForm() {
  const { register, handleSubmit, watch } = useForm<CreateAccountFormData>({
    defaultValues: {
      nickname: '',
      accountType: 'everyday',
      savingsGoal: undefined,
    },
  });

  const {
    errors,
    clearFieldError,
    setValidationErrors,
    clearAllErrors,
    markAsSubmitted,
  } = useFormValidation<CreateAccountFormData>();

  const { mutate: createAccount, isPending, isError, error, reset } = useCreateAccount();

  const accountType = watch('accountType');

  const onSubmit = (data: CreateAccountFormData) => {
    markAsSubmitted();

    const validationErrors = validateAccountForm(data);

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    clearAllErrors();

    // Clear any previous API errors before retrying
    reset();

    // Call the API using React Query mutation
    createAccount({
      nickname: data.nickname,
      accountType: data.accountType,
      savingsGoal: data.savingsGoal,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      {/* API Error Message */}
      {isError && error && (
        <Alert variant="error" message={error.message} />
      )}

      {/* Account Nickname Field */}
      <FormField
        label="Account Nickname"
        htmlFor="nickname"
        required
        error={errors.nickname}
      >
        <input
          id="nickname"
          type="text"
          {...register('nickname', {
            onChange: () => clearFieldError('nickname'),
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          disabled={isPending}
        />
      </FormField>

      {/* Account Type Radio Buttons */}
      <div className="form-field">
        <fieldset disabled={isPending}>
          <legend className="block mb-2">Account Type</legend>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="everyday"
                {...register('accountType')}
              />
              <span>Everyday Account</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="savings"
                {...register('accountType')}
              />
              <span>Savings Account</span>
            </label>
          </div>
        </fieldset>
      </div>

      {/* Savings Goal Field (conditional) */}
      {accountType === 'savings' && (
        <FormField
          label="Savings Goal"
          htmlFor="savingsGoal"
          required
          error={errors.savingsGoal}
        >
          <input
            id="savingsGoal"
            type="number"
            {...register('savingsGoal', {
              valueAsNumber: true,
              onChange: () => clearFieldError('savingsGoal'),
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter amount"
            disabled={isPending}
          />
        </FormField>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {isPending ? 'Creating Account...' : isError ? 'Retry' : 'Create Account'}
      </button>
    </form>
  );
}
