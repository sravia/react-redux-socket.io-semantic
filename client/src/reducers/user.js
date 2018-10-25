import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../constants/UserActionTypes';

export const initialState = {
  name: '',
  error: '',
  authorized: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        name: action.name,
        error: ''
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.message,
        authorized: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        name: action.name,
        error: '',
        authorized: true
      };
    case LOGOUT:
      return {
        ...state,
        error: '',
        name: '',
        authorized: false
      };
    default:
      return state;
  }
};
