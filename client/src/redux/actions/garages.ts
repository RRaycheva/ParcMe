import garageService from '../../services/garageService';
import { GET_GARAGES } from '../constants/actionTypes';
import { AppDispatch } from '../store';

export const getGarages = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const garages = await garageService.getAll();
      dispatch({
        type: GET_GARAGES,
        payload: garages,
      });
    } catch (e) {
      console.error(e);
    }
  };
};
