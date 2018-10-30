import {
  USER_DISCONNECTED,
  USER_CONNECTED,
  RECEIVE_MESSAGE,
  SET_ONLINE_USERS,
  SEND_MESSAGE
} from '../constants/SocketActionTypes';

export const initialState = {
  messages: [],
  users: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_DISCONNECTED:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: state.messages.length + 1,
            type: USER_DISCONNECTED,
            user: action.user,
            date: new Date()
          }
        ],
        users: state.users.filter(user => user.name !== action.name)
      };
    case USER_CONNECTED:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: state.messages.length + 1,
            type: USER_CONNECTED,
            user: action.user,
            date: new Date()
          }
        ],
        users: [...state.users, action.user]
      };
    case RECEIVE_MESSAGE:
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: state.messages.length + 1,
            type: RECEIVE_MESSAGE,
            content: action.message,
            user: action.user,
            date: new Date()
          }
        ]
      };
    case SET_ONLINE_USERS:
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
};
