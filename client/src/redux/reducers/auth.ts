import { AnyAction } from 'redux';
import { REGISTER } from '../constants/actionTypes';

const INITITIAL_STATE = {
  isAuth: false,
};

export default (state = INITITIAL_STATE, { payload, type }: AnyAction) => {
  switch (type) {
    case REGISTER:
      return { ...state, isAuth: true };
    default:
      return state;
  }
};
