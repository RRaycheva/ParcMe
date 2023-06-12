import { AnyAction } from 'redux';
import { GarageDto } from '../../services/garageService';
import { CLEAR_GARAGES, GET_GARAGES } from '../constants/actionTypes';

export type GaragesState = GarageDto[];

const INITITIAL_STATE: GaragesState = [];

export default (state = INITITIAL_STATE, { payload, type }: AnyAction) => {
  switch (type) {
    case GET_GARAGES:
      return [...payload];
    case CLEAR_GARAGES:
      return INITITIAL_STATE;
    default:
      return state;
  }
};
