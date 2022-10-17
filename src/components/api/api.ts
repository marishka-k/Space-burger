import { BURGER_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { checkResponse } from "../../utils/check-response";
import { TIngredientResponse, TOrderDetailsResponse, TUserLogoutResponse, TUserResponse } from "../../services/types/data";

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

export const orderDetailsRequest = async (productsId: Array<string>) => {
  return await fetch(`${config.url}/orders`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      ingredients: productsId,
    }),
  }).then(checkResponse<TOrderDetailsResponse>);
};

export const getIngredientsData = async () => {
  return await fetch(`${config.url}/ingredients`, {
    method: "GET",
    headers: config.headers_one,
  }).then(checkResponse<TIngredientResponse>);
};

export const getUserRequest = async () => {
  return await fetch(`${config.url}/auth/user`, {
    method: "GET",
    headers: config.headers_two,
  }).then(checkResponse<TUserResponse>);
};

export const loginRequest = async (email: string, password: string) => {
  return await fetch(`${config.url}/auth/login`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse<TUserResponse>);
};

export const resgisterUserRequest = async (name: string, email: string, password: string) => {
  return await fetch(`${config.url}/auth/register`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then(checkResponse<TUserResponse>);
};

export const logoutRequest = async () => {
  return await fetch(`${config.url}/auth/logout`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse<TUserLogoutResponse>);
};

export const changeUserInfoRequest = async (name: string, email: string, password: string) => {
  return await fetch(`${config.url}/auth/user`, {
    method: "PATCH",
    headers: config.headers_two,
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then(checkResponse<TUserResponse>);
};

export const updateTokenRequest = async () => {
  return await fetch(`${config.url}/auth/token`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse<TUserResponse>);
};

export const forgotPasswordRequest = async (email: string) => {
  return await fetch(`${config.url}/password-reset`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify(email),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(checkResponse<TUserResponse>);
};

export const resetPasswordRequest = async (password: string, token: string | any) => {
  return await fetch(`${config.url}/password-reset/reset`, {
    method: "POST",
    headers: config.headers_one,
    body: JSON.stringify(password, token),
  }).then(checkResponse<TUserResponse>);
};
