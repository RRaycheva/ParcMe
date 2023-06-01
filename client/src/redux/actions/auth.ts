import { AuthResponseDto } from '../../services/authService';
import { CLEAR_USER, SET_USER } from '../constants/actionTypes';
import { AppDispatch } from '../store';

export const setUser = (user: AuthResponseDto) => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: SET_USER,
        payload: user,
      });
    } catch (e) {
      console.error(e);
    }
  };
};

export const clearUser = () => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: CLEAR_USER,
      });
    } catch (e) {
      console.error(e);
    }
  };
};
