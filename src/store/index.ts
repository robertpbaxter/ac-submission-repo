import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';

// Simple thunk middleware implementation
const thunk = (store: any) => (next: any) => (action: any) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

// Create the Redux store with thunk middleware
export const store = createStore(rootReducer, applyMiddleware(thunk));

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

