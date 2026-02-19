import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  htmlFor?: string;
}

export function FormField({ label, error, required, children, htmlFor }: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor} className="block mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <span className="text-red-600 text-sm mt-1 block" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
