# React Banking Assessment - Account Creation Application

This is a react app to demonstrate proficiency in React, TypeScript, and testing. It showcases best practices in form validation, error handling, state management, etc.

---

## Requirements

### 1. Create a React.js App

Use Next.js or any framework you are familiar with to get started quickly.

- **a.** The app should run in the browser, so avoid using React server components.
- **b.** This exercise is to demonstrate your coding skills, it's fine to code things by hand even though you might use a library in real life.

### 2. Homepage

The app should have a homepage that just has a link to **"Open a bank account"**.

### 3. Account Creation Page

When the user clicks on **"Open a bank account"**, they are taken to a new page with the following fields:

- **a.** An "account nickname" field
- **b.** Radio buttons to select either "everyday account" or "savings account"
- **c.** A "savings goal" field (should only be displayed when "savings account" is selected)
- **d.** A submit button with the text "create account"

### 4. Form Submission

When the customer clicks **"create account"**:

#### a. Validation

The React app performs the following validation:

- **i.** Account nickname should be between 5 to 30 characters
- **ii.** If "savings account" is selected, there is a "savings goal" amount entered
- **iii.** "savings goal" cannot be more than $1,000,000
- **iv.** If the validation fails, there should be helpful messages put next to the relevant fields
- **v.** As the user corrects the field, the validation message disappears
- **vi.** The validation messages can only re-appear when the user clicks "create account"

#### b. Manual Validation

This validation should be coded by hand **without using a validation library**.

#### c. API Request

If the validation passes, the app should send an API request to create the account:

**Endpoint:**
```
POST /create-account
```

**Request Payload:**
```json
{
  "nickname": "My savings account",
  "savingsGoal": 500,
  "accountType": "savings"
}
```

#### d. Authorization

There is **no authorization required** for API requests.

### 5. Success Handling

If the API request succeeds, the user should be taken back to the homepage with a message indicating that the account was successfully created.

### 6. Stub Server

You will need to create a stub server for the API request.

You can use **Express.js** or a similar framework to help.

---

## Additional Notes

7. Please feel free to leave **TODOs** in the source where impractical or time consuming to code features that you would otherwise have coded in a real world app.
8. Where requirements appear to be insufficient, assume the requirements based on what you think might be best.
9. There is **no requirement to add any kinds of tests**.
10. The UI (CSS) styling is **not important**.

---


## 🚀 Quick Start

### Prerequisites
- Node.js >= 20.19.0 or >= 22.12.0
- npm or pnpm

### Installation & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Application will be available at http://localhost:3000

# Run tests
npm run test:run

# Run tests with UI
npm run test:ui

# Build for production
npm run build
```

---

## ✅ Implementation Overview

This application fully implements all assessment requirements:

### Core Features
- ✅ **Homepage** with link to "Open a bank account"
- ✅ **Account Creation Form** with:
  - Account nickname field (5-30 characters)
  - Radio buttons for account type (Everyday/Savings)
  - Conditional savings goal field (only for savings accounts)
  - Real-time validation with helpful error messages
- ✅ **Hand-coded validation** (no validation libraries used)
- ✅ **API integration** with TanStack Start server functions
- ✅ **Success handling** with redirect and personalized success message
- ✅ **Error handling** with retry functionality
- ✅ **Stub server** using TanStack Start (no Express.js needed)

> **⚠️ Note on Error Handling Demo:** The API is intentionally configured to fail randomly **30% of the time** to demonstrate robust error handling and retry functionality. This simulates real-world network issues and allows showcasing the application's resilience and user-friendly error recovery mechanisms.


-

## 🧪 Testing Strategy

### Testing Approach

While the assessment stated "no requirement to add tests," we implemented comprehensive testing to demonstrate professional development practices:

#### ✅ **Unit Tests** (84 tests)
- **File:** `src/utils/validation.test.ts`
- **Coverage:** Generic validation utilities
- **Approach:** Data-driven testing with `vitest.each`
- **Tests:** `validateRequired`, `validateStringLength`, `validateMinNumber`, `validateMaxNumber`, `combineValidations`

#### ✅ **Component Tests** (14 tests)
- **Files:**
  - `src/components/common/FormField.test.tsx` (8 tests)
  - `src/components/account/CreateAccountForm.test.tsx` (6 tests)
- **Coverage:**
  - FormField rendering, props, accessibility
  - Form validation logic integration
  - Semantic HTML structure
- **Approach:** React Testing Library with accessibility-first queries

#### ⏳ **E2E Tests** (Deferred)
- **Rationale:** More complex E2E tests with Playwright or Cypress were left for later due to time constraints
- **Production Recommendation:** Add E2E tests for complete user flows (form fill → submit → validation → API → success)

### Test Results

```
✓ src/utils/validation.test.ts (84 tests)
✓ src/components/common/FormField.test.tsx (8 tests)
✓ src/components/account/CreateAccountForm.test.tsx (6 tests)

Test Files  3 passed (3)
Tests       98 passed (98)
Duration    2.76s
```

### Running Tests

```bash
# Run all tests once
npm run test:run

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui
```

---

## 🎨 UI Component Strategy

### Current Approach: Tailwind CSS

We used **Tailwind CSS** for styling to meet the assessment's time constraints and "UI styling is not important" guideline.

> **📝 Note on Component Extraction:** This project demonstrates a **minimal component extraction approach** to showcase the direction and potential for reusable UI components. Many elements like buttons, inputs, radio buttons, and other form controls remain inline without dedicated component abstractions. In a production application, these would be extracted into a comprehensive component library for consistency, maintainability, and reusability across the codebase.

### Production Recommendation: UI Library

In a real-world application, we would use a **UI component library** such as:
- **Chakra UI** - Accessible, themeable, composable
- **Radix UI** - Unstyled, accessible primitives
- **shadcn/ui** - Copy-paste components with Radix + Tailwind
- **Material-UI (MUI)** - Comprehensive component library

### Reusable Components Demonstrated

Despite using basic Tailwind, we demonstrated the ability to create **reusable, composable UI components**:

#### 1. **`FormField` Component**
```typescript
<FormField label="Account Nickname" required error={errors.nickname}>
  <input {...register('nickname')} />
</FormField>
```
- Handles label, required indicator, error display
- Accessible with proper `htmlFor` and `role="alert"`
- Reusable across all form fields

#### 2. **`Alert` Component**
```typescript
<Alert variant="success" message="Account created!" onClose={handleClose} />
<Alert variant="error" message="Failed to create account" />
```
- Supports `success` and `error` variants
- Auto-dismiss after 5 seconds
- Manual close button
- Accessible with `role="alert"`

### Future Extensions Needed

These components would need to be extended for production:
- **Radio button groups** - Dedicated component with proper ARIA
- **Number inputs** - With formatting, min/max, step controls
- **Loading states** - Skeleton loaders, spinners
- **Form layouts** - Grid/flex layouts for complex forms
- **Validation states** - Visual indicators (icons, colors)

---

## 🏗️ Architecture & Technology Choices

### Core Stack

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **React 19** | UI Framework | Latest version with improved performance |
| **TypeScript** | Type Safety | Catch errors at compile time, better DX |
| **TanStack Router** | Routing | Type-safe routing, file-based, modern |
| **TanStack Start** | Full-stack Framework | SSR-ready, server functions, no Express needed |
| **React Query** | Server State | Caching, loading states, error handling |
| **React Hook Form** | Form State | Performant, minimal re-renders |
| **Vitest** | Testing | Fast, ESM-native, Vite integration |
| **Tailwind CSS** | Styling | Rapid development, utility-first |

### Architecture Patterns

#### 1. **Custom Hooks for Reusable Logic**

**`useFormValidation<TFormData>`** - Generic form validation hook
```typescript
const { errors, clearFieldError, setValidationErrors, markAsSubmitted } = 
  useFormValidation<CreateAccountFormData>();
```
- Manages validation error state
- Handles error clearing on field change
- Reusable across any form

**`useCreateAccount()`** - React Query mutation hook
```typescript
const { mutate, isPending, isError, error, reset } = useCreateAccount();
```
- Encapsulates API call logic
- Handles success navigation
- Manages error states

#### 2. **Context Provider for Global State**

**`AccountContext`** - Success message state management
```typescript
<AccountProvider>
  <App />
</AccountProvider>
```
- Stores created account details
- Shares success message across routes
- Auto-clear after 5 seconds

#### 3. **Hand-Coded Validation System**

**Generic Validation Utilities** (`src/utils/validation.ts`)
```typescript
validateRequired(value, message)
validateStringLength(value, { min, max, minMessage, maxMessage })
validateMinNumber(value, min, message)
validateMaxNumber(value, max, message)
combineValidations(...validations)
```

**Domain-Specific Validation** (`src/utils/accountValidation.ts`)
- Uses generic validators with domain constants
- Composable validation rules
- Type-safe with TypeScript

**Benefits:**
- ✅ No external validation library (as required)
- ✅ Reusable across different forms
- ✅ Type-safe with TypeScript
- ✅ Easy to test (pure functions)
- ✅ Composable with `combineValidations`

#### 4. **TanStack Start Server Functions (Stub Server)**

Instead of Express.js, we used **TanStack Start's server functions**:

```typescript
export const createAccount = createServerFn({ method: 'POST' })
  .inputValidator((data: CreateAccountPayload) => data)
  .handler(async ({ data }) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Randomly fail 30% of the time (for demo)
    const shouldFail = Math.random() < 0.3;
    
    if (shouldFail) {
      throw new Error('Failed to create account. Please try again.');
    }
    
    return { success: true, accountId: '...', account: data };
  });
```

**Advantages over Express.js:**
- ✅ Type-safe from client to server
- ✅ No separate server process needed
- ✅ Built-in validation with `inputValidator`
- ✅ SSR-compatible
- ✅ Simpler deployment

---

## 📁 Project Structure

```
src/
├── api/
│   └── createAccount.ts              # TanStack Start server function
├── components/
│   ├── account/
│   │   └── CreateAccountForm.tsx     # Main form component
│   ├── common/
│   │   ├── Alert.tsx                 # Reusable alert component
│   │   └── FormField.tsx             # Reusable form field component
│   ├── DefaultCatchBoundary.tsx
│   └── NotFound.tsx
├── constants/
│   └── validation.ts                 # Validation rules & messages
├── contexts/
│   └── AccountContext.tsx            # Global state for success messages
├── hooks/
│   ├── useCreateAccount.ts           # React Query mutation hook
│   └── useFormValidation.ts          # Generic form validation hook
├── routes/
│   ├── __root.tsx                    # Root layout with providers
│   ├── index.tsx                     # Homepage
│   └── create-account.tsx            # Account creation page
├── test/
│   └── setup.ts                      # Test configuration
├── types/
│   └── account.ts                    # TypeScript interfaces
└── utils/
    ├── accountValidation.ts          # Account-specific validation
    ├── validation.ts                 # Generic validation utilities
    └── seo.ts                        # SEO utilities
```

## 📊 Assessment Requirements Checklist

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Homepage with link | ✅ | `src/routes/index.tsx` |
| Account creation form | ✅ | `src/components/account/CreateAccountForm.tsx` |
| Account nickname field | ✅ | Text input with validation |
| Account type radio buttons | ✅ | Everyday/Savings options |
| Conditional savings goal field | ✅ | Shows only for savings accounts |
| Submit button | ✅ | "Create Account" / "Retry" |
| Nickname validation (5-30 chars) | ✅ | `validateStringLength` |
| Savings goal required | ✅ | `validateRequired` |
| Savings goal max $1M | ✅ | `validateMaxNumber` |
| Savings goal non-negative | ✅ | `validateMinNumber` |
| Error messages next to fields | ✅ | `FormField` component |
| Errors clear on field change | ✅ | `useFormValidation` hook |
| Errors only on submit | ✅ | `hasSubmitted` flag |
| Hand-coded validation | ✅ | `src/utils/validation.ts` |
| API request on success | ✅ | `POST /create-account` |
| Success redirect to homepage | ✅ | TanStack Router navigation |
| Success message display | ✅ | `SuccessMessage` component |
| Stub server | ✅ | TanStack Start server functions |
| No authorization | ✅ | No auth implemented |

**All requirements met! ✅**

---

## 🤖 Methodology & Development Approach

### AI-Assisted Development

In the interest of transparency, this project was developed using **Claude Sonnet 4.5** as an AI pair programming assistant, utilized extensively from initial planning through final implementation.

#### AI Involvement
- **Planning & Architecture:** Claude assisted in designing the application structure, selecting appropriate technologies, and defining implementation strategies
- **Code Implementation:** The majority of the codebase was written with Claude's assistance, including components, hooks, utilities, and validation logic
- **Testing Strategy:** Test design, implementation, and coverage decisions were made collaboratively with AI assistance
- **Documentation:** This README and inline code documentation were created with Claude's help

#### Human Oversight
While AI was instrumental in accelerating development, all code was:
- ✅ Reviewed and validated by the developer
- ✅ Tested to ensure correctness and functionality
- ✅ Aligned with project requirements and best practices
- ✅ Refined based on developer judgment and domain expertise

This approach demonstrates modern software development practices where AI tools augment human capabilities, enabling rapid prototyping while maintaining code quality and professional standards.

---

## 📄 License

This project is for assessment purposes only.

---

## 👤 Author


**Technologies:** React 19, TypeScript, TanStack Router, TanStack Start, React Query, React Hook Form, Vitest, Tailwind CSS

**Time Investment:** around 4 hours (including testing and documentation)
```