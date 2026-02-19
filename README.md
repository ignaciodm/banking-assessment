# Interview Assessment – React

> **Note:** You can ignore this assessment request if you have already built apps to demonstrate your coding abilities to employers. If that's the case, please provide us with the GitHub URL (or similar) of your source code.

**Estimated time:** 3–6 hours (for someone with prior experience on these technologies). We encourage you to time box the assignment and submit the assignment as is even if you can't complete the assignment by this time. We don't expect working code.

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

## Submission

Please provide us the following:

- **GitHub URL** containing the source or something similar.
- Please **do not provide links** to source code that could have a commercial value.