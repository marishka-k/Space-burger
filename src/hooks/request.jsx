import { checkResponse } from "../utils/check-response";

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};
