import { describe, it, expect } from 'vitest';
import {
  validateRequired,
  validateStringLength,
  validateMaxNumber,
  validateMinNumber,
  combineValidations,
  type ValidationResult,
} from './validation';

/**
 * Comprehensive test suite for validation utilities
 * Uses vitest.each for data-driven testing with multiple test cases
 */

describe('validateRequired', () => {
  it.each([
    // [value, expectedResult, description]
    [undefined, 'This field is required', 'undefined value'],
    [null, 'This field is required', 'null value'],
    ['', 'This field is required', 'empty string'],
    ['  ', undefined, 'whitespace string (not empty)'],
    ['valid', undefined, 'valid string'],
    [0, undefined, 'zero number'],
    [false, undefined, 'false boolean'],
    [[], undefined, 'empty array'],
    [{}, undefined, 'empty object'],
  ])('should return %s for %s', (value, expectedResult, _description) => {
    const result = validateRequired(value);
    expect(result).toBe(expectedResult);
  });

  it.each([
    ['Custom error message', 'Custom error message'],
    ['Field X is mandatory', 'Field X is mandatory'],
  ])('should use custom error message: %s', (customMessage, expected) => {
    const result = validateRequired(undefined, customMessage);
    expect(result).toBe(expected);
  });
});

describe('validateStringLength', () => {
  describe('minimum length validation', () => {
    it.each([
      // [value, min, expectedResult, description]
      ['', 5, undefined, 'empty string (skipped)'],
      ['abc', 5, 'Must be at least 5 characters', 'too short'],
      ['abcde', 5, undefined, 'exactly min length'],
      ['abcdef', 5, undefined, 'longer than min'],
      ['a', 1, undefined, 'single character meets min'],
      ['hello world', 5, undefined, 'long string meets min'],
    ])('should validate min length: "%s" with min=%i -> %s (%s)', (value, min, expectedResult, _description) => {
      const result = validateStringLength(value, { min });
      expect(result).toBe(expectedResult);
    });

    it('should use custom min error message', () => {
      const customMessage = 'Too short!';
      const result = validateStringLength('ab', { min: 5, minMessage: customMessage });
      expect(result).toBe(customMessage);
    });
  });

  describe('maximum length validation', () => {
    it.each([
      // [value, max, expectedResult, description]
      ['', 5, undefined, 'empty string (skipped)'],
      ['abc', 5, undefined, 'shorter than max'],
      ['abcde', 5, undefined, 'exactly max length'],
      ['abcdef', 5, 'Must be no more than 5 characters', 'exceeds max'],
      ['a', 1, undefined, 'single character meets max'],
      ['hello world', 5, 'Must be no more than 5 characters', 'long string exceeds max'],
    ])('should validate max length: "%s" with max=%i -> %s (%s)', (value, max, expectedResult, _description) => {
      const result = validateStringLength(value, { max });
      expect(result).toBe(expectedResult);
    });

    it('should use custom max error message', () => {
      const customMessage = 'Too long!';
      const result = validateStringLength('abcdefgh', { max: 5, maxMessage: customMessage });
      expect(result).toBe(customMessage);
    });
  });

  describe('min and max length validation', () => {
    it.each([
      // [value, min, max, expectedResult, description]
      ['', 5, 10, undefined, 'empty string (skipped)'],
      ['abc', 5, 10, 'Must be at least 5 characters', 'too short'],
      ['abcde', 5, 10, undefined, 'exactly min length'],
      ['abcdefg', 5, 10, undefined, 'within range'],
      ['abcdefghij', 5, 10, undefined, 'exactly max length'],
      ['abcdefghijk', 5, 10, 'Must be no more than 10 characters', 'exceeds max'],
    ])('should validate range: "%s" with min=%i, max=%i -> %s (%s)', (value, min, max, expectedResult, _description) => {
      const result = validateStringLength(value, { min, max });
      expect(result).toBe(expectedResult);
    });

    it('should prioritize min validation over max', () => {
      // When both fail, min error should be returned first
      const result = validateStringLength('ab', { min: 5, max: 3 });
      expect(result).toBe('Must be at least 5 characters');
    });
  });

  describe('edge cases', () => {
    it.each([
      [undefined, { min: 5 }, undefined, 'undefined value'],
      [null, { min: 5 }, undefined, 'null value'],
    ])('should handle %s gracefully', (value: any, options, expectedResult, _description) => {
      const result = validateStringLength(value, options);
      expect(result).toBe(expectedResult);
    });
  });
});

describe('validateMaxNumber', () => {
  it.each([
    // [value, max, expectedResult, description]
    [undefined, 100, undefined, 'undefined value'],
    [null, 100, undefined, 'null value'],
    [0, 100, undefined, 'zero'],
    [50, 100, undefined, 'below max'],
    [100, 100, undefined, 'exactly max'],
    [101, 100, 'Cannot exceed 100', 'exceeds max'],
    [1000, 100, 'Cannot exceed 100', 'far exceeds max'],
    [-50, 100, undefined, 'negative number below max'],
    [0.5, 1, undefined, 'decimal below max'],
    [1.1, 1, 'Cannot exceed 1', 'decimal exceeds max'],
    [1_000_000, 1_000_000, undefined, 'large number at max'],
    [1_000_001, 1_000_000, 'Cannot exceed 1,000,000', 'large number exceeds max'],
  ])('should validate max: %s with max=%i -> %s (%s)', (value, max, expectedResult, _description) => {
    const result = validateMaxNumber(value, max);
    expect(result).toBe(expectedResult);
  });

  it.each([
    [150, 100, 'Value too high!', 'custom error message'],
    [1_000_001, 1_000_000, 'Exceeds limit', 'custom message for large number'],
  ])('should use custom error message: %s with max=%i -> "%s"', (value, max, customMessage) => {
    const result = validateMaxNumber(value, max, customMessage);
    expect(result).toBe(customMessage);
  });

  it('should format large numbers with locale string in default message', () => {
    const result = validateMaxNumber(2_000_000, 1_000_000);
    expect(result).toBe('Cannot exceed 1,000,000');
  });
});

describe('validateMinNumber', () => {
  it.each([
    // [value, min, expectedResult, description]
    [undefined, 0, undefined, 'undefined value'],
    [null, 0, undefined, 'null value'],
    [0, 0, undefined, 'exactly min (zero)'],
    [1, 0, undefined, 'above min'],
    [-1, 0, 'Must be at least 0', 'below min (negative)'],
    [50, 100, 'Must be at least 100', 'below min'],
    [100, 100, undefined, 'exactly min'],
    [150, 100, undefined, 'above min'],
    [-100, -50, 'Must be at least -50', 'negative below negative min'],
    [-50, -50, undefined, 'exactly negative min'],
    [-25, -50, undefined, 'above negative min'],
    [0.5, 1, 'Must be at least 1', 'decimal below min'],
    [1.5, 1, undefined, 'decimal above min'],
    [999_999, 1_000_000, 'Must be at least 1,000,000', 'large number below min'],
    [1_000_000, 1_000_000, undefined, 'large number at min'],
  ])('should validate min: %s with min=%i -> %s (%s)', (value, min, expectedResult, _description) => {
    const result = validateMinNumber(value, min);
    expect(result).toBe(expectedResult);
  });

  it.each([
    [-5, 0, 'Cannot be negative!', 'custom error for negative'],
    [50, 100, 'Too low!', 'custom error for below min'],
  ])('should use custom error message: %s with min=%i -> "%s"', (value, min, customMessage) => {
    const result = validateMinNumber(value, min, customMessage);
    expect(result).toBe(customMessage);
  });

  it('should format large numbers with locale string in default message', () => {
    const result = validateMinNumber(500_000, 1_000_000);
    expect(result).toBe('Must be at least 1,000,000');
  });
});

describe('combineValidations', () => {
  it.each([
    // [validations, expectedResult, description]
    [[], undefined, 'empty array'],
    [[undefined], undefined, 'single undefined'],
    [[undefined, undefined, undefined], undefined, 'multiple undefined'],
    [['Error 1'], 'Error 1', 'single error'],
    [['Error 1', 'Error 2'], 'Error 1', 'multiple errors (returns first)'],
    [[undefined, 'Error 2'], 'Error 2', 'undefined then error'],
    [[undefined, undefined, 'Error 3'], 'Error 3', 'multiple undefined then error'],
    [['Error 1', undefined, 'Error 3'], 'Error 1', 'error then undefined (returns first)'],
  ])('should combine validations: %s -> %s (%s)', (validations, expectedResult, _description) => {
    const result = combineValidations(...validations);
    expect(result).toBe(expectedResult);
  });

  it('should work with real validation functions', () => {
    const value = 'ab';
    const result = combineValidations(
      validateRequired(value),
      validateStringLength(value, { min: 5, max: 10 })
    );
    expect(result).toBe('Must be at least 5 characters');
  });

  it('should return undefined when all validations pass', () => {
    const value = 'valid';
    const result = combineValidations(
      validateRequired(value),
      validateStringLength(value, { min: 3, max: 10 })
    );
    expect(result).toBeUndefined();
  });

  it('should handle complex validation chains', () => {
    // Simulate nickname validation: required + length
    const nickname = '';
    const result = combineValidations(
      validateRequired(nickname, 'Nickname is required'),
      validateStringLength(nickname, { min: 5, max: 30 })
    );
    expect(result).toBe('Nickname is required');
  });

  it('should handle complex number validation chains', () => {
    // Simulate savings goal validation: required + min + max
    const savingsGoal = -100;
    const result = combineValidations(
      validateRequired(savingsGoal, 'Savings goal is required'),
      validateMinNumber(savingsGoal, 0, 'Cannot be negative'),
      validateMaxNumber(savingsGoal, 1_000_000, 'Cannot exceed $1,000,000')
    );
    expect(result).toBe('Cannot be negative');
  });
});

describe('integration tests', () => {
  describe('real-world validation scenarios', () => {
    it('should validate account nickname (5-30 characters)', () => {
      const testCases: Array<[string, ValidationResult]> = [
        ['', 'Nickname is required'],
        ['abc', 'Must be at least 5 characters'],
        ['valid', undefined],
        ['My Savings Account', undefined],
        ['a'.repeat(30), undefined],
        ['a'.repeat(31), 'Must be no more than 30 characters'],
      ];

      testCases.forEach(([nickname, expected]) => {
        const result = combineValidations(
          validateRequired(nickname, 'Nickname is required'),
          validateStringLength(nickname, {
            min: 5,
            max: 30,
            minMessage: 'Must be at least 5 characters',
            maxMessage: 'Must be no more than 30 characters',
          })
        );
        expect(result).toBe(expected);
      });
    });

    it('should validate savings goal (0 to 1,000,000)', () => {
      const testCases: Array<[number | undefined, ValidationResult]> = [
        [undefined, 'Savings goal is required'],
        [-1, 'Cannot be negative'],
        [0, undefined],
        [500_000, undefined],
        [1_000_000, undefined],
        [1_000_001, 'Cannot exceed $1,000,000'],
      ];

      testCases.forEach(([savingsGoal, expected]) => {
        const result = combineValidations(
          validateRequired(savingsGoal, 'Savings goal is required'),
          validateMinNumber(savingsGoal, 0, 'Cannot be negative'),
          validateMaxNumber(savingsGoal, 1_000_000, 'Cannot exceed $1,000,000')
        );
        expect(result).toBe(expected);
      });
    });
  });

  describe('type safety', () => {
    it('should return ValidationResult type', () => {
      const result: ValidationResult = validateRequired('test');
      expect(result === undefined || typeof result === 'string').toBe(true);
    });

    it('should work with type inference', () => {
      const result = combineValidations(
        validateRequired('test'),
        validateStringLength('test', { min: 1 })
      );
      // TypeScript should infer ValidationResult type
      const _typeCheck: ValidationResult = result;
      expect(result).toBeUndefined();
    });
  });
});
