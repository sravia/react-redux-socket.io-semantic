import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root';
import socketMiddleware from '../middleware/sockets';

export default () =>
  createStore(rootReducer, applyMiddleware(thunk, socketMiddleware()));
