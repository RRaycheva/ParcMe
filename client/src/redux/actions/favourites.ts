import garageService from '../../services/garageService';
import { GET_FAVOURITES } from '../constants/actionTypes';
import { AppDispatch } from '../store';

export const getFavourites = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const favourites = await garageService.getFavourites();
      const garages = favourites.map(e => e.garage);
      dispatch({
        type: GET_FAVOURITES,
        payload: garages,
      });
    } catch (e) {
      console.error(e);
    }
  };
};
