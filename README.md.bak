# Feature Usage Widget Challenge

**Time Estimate:** 2-3 hours

## Overview
Build a feature usage widget that displays an account's usage against plan limits with contextual upgrade prompts.

## Requirements

### Functional Requirements

1. **Display Two Usage Metrics:**
   - **Contacts Widget:** Shows current contacts vs. limit (counts up to maximum)
   - **Email Sends Widget:** Shows remaining email sends vs. limit with reset date (counts down)

2. **Visual Progress Indicators:**
   - Display usage as both a progress bar and numerical values
   - Progress bars should visually indicate urgency:
     - < 70% used: Normal state (e.g., green/blue)
     - 70-89% used: Warning state (e.g., yellow/orange)  
     - ≥ 90% used: Critical state (e.g., red)

3. **Contextual Upgrade Prompts:**
   - Show upgrade CTAs when usage is ≥ 80%
   - Different messaging based on usage level
   - Clicking upgrade should trigger `alert()` with the next plan tier name
   - Don't show upgrade prompts for Enterprise tier (no higher tier available)

4. **Email Sends Reset Date:**
   - Display "Resets on [date]" for email sends limit
   - Format the date in a user-friendly way (e.g., "October 20, 2025")

5. **Redux State Management:**
   - All usage and account data must live in Redux store
   - Implement actions and reducers using Redux
   - Components should use `useSelector` and `useDispatch`

6. **API Integration:**
   - Fetch data using the mock API functions in `/src/api/mockApi.ts`
   - Handle loading and error states
   - API responses are documented in mockApi.ts

7. **TypeScript:**
   - Define interfaces for all data structures
   - Type all Redux actions, state, and reducers
   - Type all component props

### Technical Requirements

- Use styled-components for all styling
- Create reusable components where appropriate
- Write at least 2-3 unit tests
- Handle edge cases
- Responsive design not required, but layout should be reasonable

### What's Provided

- Basic app shell in `App.tsx`
- Empty Redux store setup
- Mock API function signatures with documented response shapes
- Sample data scenarios in `/public/sample-data.json`

### What You Need to Build

- Redux store implementation (actions, reducers, types)
- All UI components for the usage widgets
- Progress bar components with color states
- Upgrade prompt components
- Tests for key functionality

## Getting Started

1. Install dependencies: `npm install`
2. Start the dev server: `npm start`
3. Run tests: `npm test`

## Submission

1. Push your completed code to a GitHub repository OR return as a zipped directory by email.
2. You will discuss your submission in a live code review during the panel interview step.
