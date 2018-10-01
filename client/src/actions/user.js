import { LOGIN_REQUEST,LOGOUT } from '../constants/UserActionTypes';

export const login = name=> {
	return dispatch => {
		dispatch({
			type: LOGIN_REQUEST,
			name
		});
	};
}

export const logout = () => {
	return dispatch => {
		dispatch({
			type: LOGOUT
		});
	};
}
