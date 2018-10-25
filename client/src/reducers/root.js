import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import user from './user';
import socket from './socket';

const root = combineReducers({
  user,
  socket,
  form: reduxFormReducer
});

export default root;
