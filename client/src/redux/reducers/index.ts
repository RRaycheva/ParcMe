import { combineReducers } from 'redux';
import auth from './auth';
import favourites from './favourites';
import garages from './garages';

export default combineReducers({
  auth,
  garages,
  favourites,
});
