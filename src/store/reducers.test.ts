import { rootReducer } from '../store/reducers';
import { fetchDataStart, fetchDataSuccess, fetchDataError } from '../store/actions';
import { UsageData, AccountData } from '../types';

describe('rootReducer', () => {
  const initialState = {
    usage: undefined,
    account: undefined,
    loading: false,
    error: undefined,
  };

  const mockUsageData: UsageData = {
    contacts: { current: 850, limit: 1000, percentUsed: 85 },
    emailSends: { remaining: 1200, limit: 10000, resetDate: '2025-10-20T00:00:00Z', percentUsed: 88 }
  };

  const mockFullUsageData: UsageData = {
    contacts: { current: 1000, limit: 1000, percentUsed: 100 },
    emailSends: { remaining: 0, limit: 10000, resetDate: '2025-10-20T00:00:00Z', percentUsed: 100 }
  };

  const mockAccountData: AccountData = {
    planName: 'Plus',
    planTier: 'plus',
    upgradeable: true,
    nextTier: { name: 'Professional', contactLimit: 2500, emailSendLimit: 25000 }
  };

  it('should handle FETCH_DATA_START', () => {
    const action = fetchDataStart();
    const newState = rootReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      loading: true,
      error: undefined,
    });
  });

  it('should handle FETCH_DATA_SUCCESS', () => {
    const action = fetchDataSuccess(mockUsageData, mockAccountData);
    const newState = rootReducer(initialState, action);

    expect(newState).toEqual({
      usage: mockUsageData,
      account: mockAccountData,
      loading: false,
      error: undefined,
    });
  });

  it('should handle FETCH_DATA_ERROR', () => {
    const errorMessage = 'Network error';
    const action = fetchDataError(errorMessage);
    const newState = rootReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage,
    });
  });

  it('should handle FETCH_DATA_SUCCESS with full usage data', () => {
    const action = fetchDataSuccess(mockFullUsageData, mockAccountData);
    const newState = rootReducer(initialState, action);

    expect(newState).toEqual({
      usage: mockFullUsageData,
      account: mockAccountData,
      loading: false,
      error: undefined,
    });
    expect(newState.usage?.contacts.percentUsed).toBe(100);
    expect(newState.usage?.emailSends.percentUsed).toBe(100);
  });

  it('should return the current state for unknown actions', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' } as any;
    const newState = rootReducer(initialState, unknownAction);

    expect(newState).toBe(initialState);
  });
});