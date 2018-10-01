import { SEND_MESSAGE,RECEIVE_MESSAGE } from '../constants/SocketActionTypes'

export const sendMessage = (message,name) => {
	return dispatch => {
		dispatch({
			type: SEND_MESSAGE,
			message,
			name
		});
	};
}

export const receiveMessage = (message,name) => {
	return dispatch => {
		dispatch({
			type: RECEIVE_MESSAGE,
			message,
			name
		});
	};
}