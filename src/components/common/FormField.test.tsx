import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('should render label and children', () => {
    render(
      <FormField label="Test Label" htmlFor="test-id">
        <input id="test-id" />
      </FormField>
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should display required asterisk when required prop is true', () => {
    render(
      <FormField label="Required Field" required>
        <input />
      </FormField>
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should not display required asterisk when required prop is false', () => {
    render(
      <FormField label="Optional Field" required={false}>
        <input />
      </FormField>
    );
    
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('should display error message when error prop is provided', () => {
    const errorMessage = 'This field is invalid';
    render(
      <FormField label="Field" error={errorMessage}>
        <input />
      </FormField>
    );
    
    const errorElement = screen.getByRole('alert');
    expect(errorElement).toHaveTextContent(errorMessage);
  });

  it('should not display error when error prop is undefined', () => {
    render(
      <FormField label="Field">
        <input />
      </FormField>
    );
    
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should associate label with input using htmlFor', () => {
    render(
      <FormField label="Email Address" htmlFor="email-input">
        <input id="email-input" type="email" />
      </FormField>
    );
    
    const label = screen.getByText('Email Address');
    expect(label).toHaveAttribute('for', 'email-input');
  });

  it('should render multiple children correctly', () => {
    render(
      <FormField label="Complex Field">
        <input type="text" placeholder="First" />
        <input type="text" placeholder="Second" />
      </FormField>
    );
    
    expect(screen.getByPlaceholderText('First')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Second')).toBeInTheDocument();
  });

  it('should display both required indicator and error message', () => {
    const errorMessage = 'Field is required';
    render(
      <FormField label="Field" required error={errorMessage}>
        <input />
      </FormField>
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
  });
});
