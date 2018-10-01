import rootReducer from '../reducers/root'
import { createStore,applyMiddleware} from 'redux';
import socketMiddleware from '../middleware/sockets';
import thunk from 'redux-thunk';

export default () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk,socketMiddleware()))
}