import { createStore } from 'redux';

// TODO: Implement reducers, actions, and state shape

// Empty root reducer - candidates will implement this
const rootReducer = (state = {}, action: any) => {
  return state;
};

// Create the Redux store
export const store = createStore(rootReducer);

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

