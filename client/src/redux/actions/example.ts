import { TEST } from '../constants/actionTypes';
import { AppDispatch } from '../store';

export const incrementCounter = count => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: TEST,
        payload: count,
      });
    } catch (e) {
      console.error(e);
    }
  };
};
