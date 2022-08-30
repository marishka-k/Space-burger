
import { deleteCookie, setCookie } from "../../utils/cookie";
import { changeUserInfoRequest, loginRequest, logoutRequest, resgisterUserRequest } from "../../components/api/api";

export const LOGIN_FORM_REQUEST = 'LOGIN_FORM_REQUEST';
export const LOGIN_FORM_SUCCESS = 'LOGIN_FORM_SUCCESS';
export const LOGIN_FORM_FAILED = 'LOGIN_FORM_FAILED';
export const LOGIN_FORM_SET_VALUE = 'LOGIN_FORM_SET_VALUE';

export const LOGOUT_FORM_REQUEST = 'LOGOUT_FORM_REQUEST';
export const LOGOUT_FORM_SUCCESS = 'LOGOUT_FORM_SUCCESS';
export const LOGOUT_FORM_FAILED = 'LOGOUT_FORM_FAILED';

export const REGISTER_FORM_REQUEST = 'REGISTER_FORM_REQUEST';
export const REGISTER_FORM_SUCCESS = 'REGISTER_FORM_SUCCESS';
export const REGISTER_FORM_FAILED = 'REGISTER_FORM_FAILED';
export const REGISTER_FORM_SET_VALUE = 'REGISTER_FORM_SET_VALUE';

export const CHANGE_USER_REQUEST = 'CHANGE_USER_REQUEST';
export const CHANGE_USER_SUCCESS = 'CHANGE_USER_SUCCESS';
export const CHANGE_USER_FAILED = 'CHANGE_USER_FAILED';

export const setLoginFormValue = (field, value) => ({
	type: LOGIN_FORM_SET_VALUE,
	field,
	value,
});

export function singIn(email, password) {
	return function (dispatch) {
		dispatch({
			type: LOGIN_FORM_REQUEST,
		});
		loginRequest(email, password)
			.then(res => {
				const accessToken = res.accessToken.split('Bearer ')[1];
				const refreshToken = res.refreshToken;
				setCookie('token', accessToken);
				localStorage.setItem('refreshToken', refreshToken);
				return res;
			})
			.then((res) => {
				dispatch({
					type: LOGIN_FORM_SUCCESS,
					user: res.user,
				});
			})
			.catch(() => {
				dispatch({
					type: LOGIN_FORM_FAILED,
				});
			})
	};
}

export function singOut() {
	return function (dispatch) {
		dispatch({
			type: LOGOUT_FORM_REQUEST,
		});
		logoutRequest()
			.then(res => {
				const refreshToken = res.refreshToken;
				deleteCookie('token');
				localStorage.removeItem('refreshToken', refreshToken);
				if (res && res.success) {
					dispatch({
						type: LOGOUT_FORM_SUCCESS,
					});
				} else {
					dispatch({ type: LOGOUT_FORM_FAILED });
				}
			})
			.catch(() => {
				dispatch({
					type: LOGOUT_FORM_FAILED,
				});
			})
	};
}

export const setRegisterFormValue = (field, value) => ({
	type: REGISTER_FORM_SET_VALUE,
	field,
	value,
});

export function registerUser(email, password, name) {
	return function (dispatch) {
		dispatch({
			type: REGISTER_FORM_REQUEST,
		});
		resgisterUserRequest(email, password, name)
			.then(res => {
				const accessToken = res.accessToken.split('Bearer ')[1];
				const refreshToken = res.refreshToken;
				setCookie('token', accessToken);
				localStorage.setItem('refreshToken', refreshToken);
				return res;
			})
			.then((res) => {
				dispatch({
					type: REGISTER_FORM_SUCCESS,
					user: res,
				});
			})
			.catch(() => {
				dispatch({
					type: REGISTER_FORM_FAILED,
				});
			})
	};
}

export function changeUser(email, name, password) {
	return function (dispatch) {
		dispatch({
			type: CHANGE_USER_REQUEST,
		});
		changeUserInfoRequest(email, name, password)
			.then((res) => {
				dispatch({
					type: CHANGE_USER_SUCCESS,
					user: res,
				});
			})
			.catch(() => {
				dispatch({
					type: CHANGE_USER_FAILED,
				});
			})
	};
}