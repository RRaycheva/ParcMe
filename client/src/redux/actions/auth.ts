import { REGISTER } from '../constants/actionTypes';
import { AppDispatch } from '../store';

export const incrementCounter = isAuth => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: REGISTER,
        payload: isAuth,
      });
    } catch (e) {
      console.error(e);
    }
  };
};
