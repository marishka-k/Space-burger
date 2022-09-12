import { BURGER_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { request } from "../../hooks/request";

const config = {
  url: BURGER_URL,
  headers_one: {
    "Content-type": "application/json",
  },
  headers_two: {
    "Content-type": "application/json",
    Authorization: "Bearer " + getCookie("token"),
  },
};


export const orderDetailsRequest = async (productsId) => {
  return await request(`${config.url}/orders`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      ingredients: productsId,
    }),
  });
};

export const getIngredientsData = async () => {
  return await request(`${config.url}/ingredients`, {
    method: "GET",
    headers: config.headers_one,
  });
};

export const getUserRequest = async () => {
  return await request(`${config.url}/auth/user`, {
    method: "GET",
    headers: config.headers_two,
  });
};

export const loginRequest = async (email, password) => {
  return await request(`${config.url}/auth/login`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

export const resgisterUserRequest = async (email, password, userName) => {
  return await request(`${config.url}/auth/register`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      email: email,
      password: password,
      name: userName,
    }),
  });
};

export const logoutRequest = async () => {
  return await request(`${config.url}/auth/logout`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const changeUserInfoRequest = async (name, email, password) => {
  return await request(`${config.url}/auth/user`, {
    method: "PATCH",
    headers: config.headers_two,
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });
};

export const updateTokenRequest = async () => {
  return await request(`${config.url}/auth/token`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const forgotPasswordRequest = async (email) => {
  return await request(`${config.url}/password-reset`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify(email),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
};

export const resetPasswordRequest = async (password, token) => {
  return await request(`${config.url}/password-reset/reset`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify(password, token),
  });
};
