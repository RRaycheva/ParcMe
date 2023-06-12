import { AnyAction } from 'redux';
import { GarageDto } from '../../services/garageService';
import { GET_FAVOURITES } from '../constants/actionTypes';

export type FavouritesState = GarageDto[];

const INITITIAL_STATE: FavouritesState = [];

export default (state = INITITIAL_STATE, { payload, type }: AnyAction) => {
  switch (type) {
    case GET_FAVOURITES:
      return [...payload];
    default:
      return state;
  }
};
