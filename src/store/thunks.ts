import { Dispatch } from 'redux';
import { fetchUsageData, fetchAccountData } from '../api/mockApi';
import { fetchDataStart, fetchDataSuccess, fetchDataError } from './actions';

export const fetchAppData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchDataStart());
    
    try {
      const [usage, account] = await Promise.all([
        fetchUsageData(),
        fetchAccountData(),
      ]);
      
      dispatch(fetchDataSuccess(usage, account));
    } catch (error) {
      dispatch(fetchDataError(error instanceof Error ? error.message : 'An error occurred'));
    }
  };
};