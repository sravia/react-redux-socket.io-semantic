import { combineReducers } from 'redux'
import user from './user'
import socket from './socket'
import { reducer as reduxFormReducer } from 'redux-form';

const root = combineReducers({
  user,
  socket,
  form: reduxFormReducer
})

export default root
