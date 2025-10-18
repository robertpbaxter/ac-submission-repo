import { UsageData, AccountData } from '../types';

// Action Types
export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

// Action Interfaces
export interface FetchDataStartAction {
  type: typeof FETCH_DATA_START;
}

export interface FetchDataSuccessAction {
  type: typeof FETCH_DATA_SUCCESS;
  payload: {
    usage: UsageData;
    account: AccountData;
  };
}

export interface FetchDataErrorAction {
  type: typeof FETCH_DATA_ERROR;
  payload: string;
}

export type AppAction = FetchDataStartAction | FetchDataSuccessAction | FetchDataErrorAction;

// Action Creators
export const fetchDataStart = (): FetchDataStartAction => ({
  type: FETCH_DATA_START,
});

export const fetchDataSuccess = (usage: UsageData, account: AccountData): FetchDataSuccessAction => ({
  type: FETCH_DATA_SUCCESS,
  payload: { usage, account },
});

export const fetchDataError = (error: string): FetchDataErrorAction => ({
  type: FETCH_DATA_ERROR,
  payload: error,
});