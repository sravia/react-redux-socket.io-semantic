import io from 'socket.io-client';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../constants/UserActionTypes';
import {
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  USER_CONNECTED,
  USER_DISCONNECTED,
  SET_ONLINE_USERS
} from '../constants/SocketActionTypes';

export default function socketMiddleware() {
  let socket;

  return store => next => action => {
    switch (action.type) {
      case LOGIN_REQUEST: {
        socket = io.connect('http://localhost:3000');

        socket.on('connect', () => {
          console.log('Connected');
          socket.emit('join', { name: action.name });
        });

        socket.on('disconnect', payload => {
          console.log('Disconnected', payload);
        });

        socket.on('connect_error', () => {
          console.log('Connection error');
          store.dispatch({
            type: LOGIN_FAILURE,
            message: 'Server unavailable'
          });
        });

        socket.on('message', payload => {
          console.log('Received message', payload);

          switch (payload.type) {
            case LOGIN_FAILURE:
              store.dispatch({
                type: LOGIN_FAILURE,
                message: payload.message
              });
              break;
            case LOGIN_SUCCESS:
              store.dispatch({
                type: LOGIN_SUCCESS,
                name: payload.name
              });

              store.dispatch({
                type: SET_ONLINE_USERS,
                users: payload.users
              });
              break;
            case USER_CONNECTED:
              store.dispatch({
                type: USER_CONNECTED,
                name: payload.name
              });
              break;
            case USER_DISCONNECTED:
              store.dispatch({
                type: USER_DISCONNECTED,
                name: payload.name
              });
              break;
            case RECEIVE_MESSAGE:
              store.dispatch({
                type: RECEIVE_MESSAGE,
                messageType: payload.type,
                name: payload.name,
                message: payload.message
              });
              break;
            default:
              break;
          }
        });

        break;
      }
      case LOGOUT: {
        socket.disconnect();
        break;
      }
      case SEND_MESSAGE: {
        socket.send({
          name: action.name,
          message: action.message
        });
        break;
      }
      default:
        break;
    }

    return next(action);
  };
}
