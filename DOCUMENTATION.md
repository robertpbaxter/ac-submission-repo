# TASK DOCUMENTATION

## Overview
Giving the reviewers full transparency on both my decision-making process as well as a sneak peek into my learning process. I am not counting documentation time as a part of the 2-3 hour estimation.

## Steps

1. **Preparation and understanding**
- Read and understand instructions
- Inspect what was provided
  - Notice the comments prompting additions in store index and app.tsx
  - Uses a mock api for data
  - Create private repo, install dependencies, fire up the app
- Identify major obstacles
  - Minimal style guide (font alone)
  - No component library (since assessors want reusable components)
  - No existing implementation for state management (also desired in assessment)
  - I haven't touched react, state machines (I built one in Xstate) or redux since 2020
- Identify my strengths
  - Typescript
  - Using centralized stores (ember-data), unidirectional data flow (Data Down, Actions Up)
  - Declarative programming (updates by observers)
  - We actually incorporated the `useEffect` hook into ember at my first employment as a tool for enabling side effects

2. **Weighing my options**
- Three ideas came to mind for action
  1. Hand craft everything from scratch
  2. Find examples of similar code online for inspiration
  3. Tap into agentic resources
- Strengths of each option
  1. Prove that I have memorized X amount of esoteric knowledge?
  2. I can find examples that suit my own style
  3. React provides a much greater base of data for LLMs than antiquated ember.js versions, plus AI does better at generating new content than understanding and modifying existing code bases (which is my specialty). I can use an agent to generate a working example that I can expand .
- Drawbacks to each option
  1. Test anxiety and assessment deadlines have an unreasonable influence on my ability to focus. Consulting online docs for react redux and react basics errors would end up consuming all the assessment time (e.g. an ember template convention `usage={{usage.contacts}}` instead of `usage={usage.contacts}`).
  2. Searching online is another time sink, plus I risk exhibiting novice copypasta mistakes. Realistically, it feels like plagiarism anyways.
  3. The fundamental drawback of employing an AI agent is still demonstrating my skills as a senior software engineer. I have to show how I am using agentive tools to overcome my current skill gaps and prove that the agent is not just doing the work for me.

3. **Copilot Contribution**
- I initially prompted copilot to create a pair of components as bare bones components that I could populate: `In this react application within #file:src , generate two components inside the #sym:WidgetsContainer that will host code.`
  - The agent inspected the code base and found more context than in the prompt. The components were functional, but the mock api data was being displayed without state management.
- I discarded the initially suggested implementation and revised my prompt to include the instructions because it reads as well-written context: `In this react application within #file:src , generate two components inside the #sym:WidgetsContainer that will host usage data. Follow all the instructions in the #file:README.md.`
  - Copilot generated all the typescript interfaces, a redux store, a series of abstract components, and a test for each component.

4. **Acceptance testing the Copilot output:**
- I brought up the app and started swapping scenarios from the mockApi to check all the cases 
- Created new cases for a no-data state as well as a professional-to-enterprise level CTA
- Broke the mockApi to ensure that errors are handled (app doesn't crash) and that errors contents are displayed to the user

5. **Modifications**
- Created a "full" scenario
- Replacing `null` with `undefined`: In terms of flexibility and familiarity, I am accustomed to normalizing `null` values into `undefined` for the use of optionality chaining, plus the simplicity of handling union types (e.g. network requests are either a success or an error, not both).
- Testing upgrades: