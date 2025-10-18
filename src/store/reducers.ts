import { AppState } from '../types';
import { AppAction, FETCH_DATA_START, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from './actions';

// 
const initialState: AppState = {
  usage: undefined,
  account: undefined,
  loading: false,
  error: undefined,
};

export const rootReducer = (state = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        usage: action.payload.usage,
        account: action.payload.account,
        error: undefined,
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};