import React from 'react';

export type AlertVariant = 'success' | 'error';

interface AlertProps {
  variant: AlertVariant;
  message: string;
  onClose?: () => void;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  success: 'bg-green-100 border-green-400 text-green-700',
  error: 'bg-red-100 border-red-400 text-red-700',
};

const variantLabels: Record<AlertVariant, string> = {
  success: 'Success!',
  error: 'Error!',
};

export function Alert({ variant, message, onClose, className = '' }: AlertProps) {
  return (
    <div
      className={`${variantStyles[variant]} border px-4 py-3 rounded relative mb-4 ${className}`}
      role="alert"
    >
      <strong className="font-bold">{variantLabels[variant]} </strong>
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="text-2xl">&times;</span>
        </button>
      )}
    </div>
  );
}
