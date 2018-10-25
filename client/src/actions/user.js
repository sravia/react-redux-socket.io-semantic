import { LOGIN_REQUEST, LOGOUT } from '../constants/UserActionTypes';

export const login = name => dispatch => {
  dispatch({
    type: LOGIN_REQUEST,
    name
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
