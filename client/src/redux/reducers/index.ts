import { combineReducers } from 'redux';
import auth from './auth';
import garages from './garages';

export default combineReducers({
  auth,
  garages,
});
