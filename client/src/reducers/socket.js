import {
    USER_DISCONNECTED,
    USER_CONNECTED,
    RECEIVE_MESSAGE,
    SET_ONLINE_USERS,
    SEND_MESSAGE
  } from '../constants/SocketActionTypes';

export const initialState = {
    messages : [],
    users: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_DISCONNECTED:
            return {
                ...state,
                messages : [...state.messages, {
                    id: ++state.messages.length,
                    type: USER_DISCONNECTED,
                    name: action.name,
                    date: new Date()
                }],
                users : state.users.filter(name => name !== action.name)
            }
        case USER_CONNECTED:
            return {
                ...state,
                messages : [...state.messages, {
                    id: ++state.messages.length,
                    type: USER_CONNECTED,
                    name: action.name,
                    date: new Date()
                }],
                users : [...state.users,action.name]
            }
        case RECEIVE_MESSAGE:
        case SEND_MESSAGE:
            return {
                ...state,
                messages : [...state.messages, {
                    id: ++state.messages.length,
                    type: RECEIVE_MESSAGE,
                    content: action.message,
                    name: action.name,
                    date: new Date()
                }]
            }
        case SET_ONLINE_USERS:
            return {
                ...state,
                users : action.users
            }
        default:
        return state;
    }
};