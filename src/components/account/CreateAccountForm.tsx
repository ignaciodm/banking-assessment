import { useForm } from 'react-hook-form';
import type { CreateAccountFormData } from '~/types/account';

export function CreateAccountForm() {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<CreateAccountFormData>({
    defaultValues: {
      nickname: '',
      accountType: 'everyday',
      savingsGoal: undefined,
    },
  });

  // Watch account type to conditionally show savings goal
  const accountType = watch('accountType');

  const onSubmit = (data: CreateAccountFormData) => {
    // TODO: Implement API call with React Query in next commit
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      {/* Account Nickname Field */}
      <div className="form-field">
        <label htmlFor="nickname" className="block mb-2">
          Account Nickname
        </label>
        <input
          id="nickname"
          type="text"
          {...register('nickname')}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      {/* Account Type Radio Buttons */}
      <div className="form-field">
        <fieldset>
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
        <div className="form-field">
          <label htmlFor="savingsGoal" className="block mb-2">
            Savings Goal
          </label>
          <input
            id="savingsGoal"
            type="number"
            {...register('savingsGoal', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter amount"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create Account
      </button>
    </form>
  );
}
