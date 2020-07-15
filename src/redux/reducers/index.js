import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { LOG_OUT } from '../constants/actionTypes';
import user from './user';

const appReducers = combineReducers({
  user,
  router: routerReducer,
  toastr: toastrReducer,
});

const rootReducer = (state, action) => {
  let updatedState = { ...state };

  if (action.type === LOG_OUT) {
    updatedState = undefined;
  }

  return appReducers(updatedState, action);
};

export default rootReducer;
