import { AnyAction } from 'redux';
import { TEST } from '../constants/actionTypes';

const INITITIAL_STATE = {
  count: 0,
};

export default (state = INITITIAL_STATE, { payload, type }: AnyAction) => {
  switch (type) {
    case TEST:
      return { ...state, count: payload + state.count };
    default:
      return state;
  }
};
