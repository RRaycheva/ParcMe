import { AnyAction } from 'redux';
import { AuthResponseDto } from '../../services/authService';
import { CLEAR_USER, SET_USER } from '../constants/actionTypes';

export interface AuthState extends AuthResponseDto {}

const INITITIAL_STATE: Partial<AuthState> = {};

export default (state = INITITIAL_STATE, { payload, type }: AnyAction) => {
  switch (type) {
    case SET_USER:
      return { ...state, ...payload };
    case CLEAR_USER:
      return INITITIAL_STATE;
    default:
      return state;
  }
};
