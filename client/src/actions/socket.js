import { SEND_MESSAGE, RECEIVE_MESSAGE } from '../constants/SocketActionTypes';

export const sendMessage = (message, user) => dispatch => {
  dispatch({
    type: SEND_MESSAGE,
    message,
    user
  });
};

export const receiveMessage = (message, user) => dispatch => {
  dispatch({
    type: RECEIVE_MESSAGE,
    message,
    user
  });
};
