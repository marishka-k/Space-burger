import { BURGER_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/check-response";
import { getCookie } from "../../utils/cookie";

const config = {
  url: BURGER_URL,
  headers_one: {
    "Content-type": "application/json",
  },
  headers_two: {
    "Content-type": "application/json",
    authorization: "Bearer " + getCookie("token"),
  },
};

export const orderDetailsRequest = async (productsId) => {
  return await fetch(`${config.url}/orders`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      ingredients: productsId,
    }),
  }).then(checkResponse);
};

export const getIngredientsData = async () => {
  return await fetch(`${config.url}/ingredients`, {
    method: "GET",
    headers: config.headers_two,
  }).then(checkResponse);
};

export const getUserRequest = async () => {
  return await fetch(`${config.url}/auth/user`, {
    method: "GET",
    headers: config.headers_one,
  }).then(checkResponse);
};

export const loginRequest = async (email, password) => {
  return await fetch(`${config.url}/auth/login`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse);
};

export const resgisterUserRequest = async (email, password, userName) => {
  return await fetch(`${config.url}/auth/register`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      email: email,
      password: password,
      name: userName,
    }),
  }).then(checkResponse);
};

export const logoutRequest = async () => {
  return await fetch(`${config.url}/auth/logout`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const changeUserInfoRequest = async (name, email, password) => {
  return await fetch(`${config.url}/auth/user`, {
    method: "PATCH",
    headers: config.headers_two,
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then(checkResponse);
};

export const updateTokenRequest = async () => {
	return await fetch(`${config.url}/auth/token`, {
		method: 'POST',
		headers: config.headers_one,
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(checkResponse);
}

export const forgotPasswordRequest = async email => {
	return await fetch(`${config.url}/password-reset`, {
		method: 'POST',
    headers: config.headers_one,
		body: JSON.stringify(
			email
		),
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	})
		.then(checkResponse);
}
