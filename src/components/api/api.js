import { BURGER_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/check-response";

const config = {
  url: BURGER_URL,
  headers: {
    "Content-type": "application/json",
  },
};

  export const orderDetailsRequest = async (productsId) => {
	const res = await fetch(`${config.url}/orders`, {
		method: 'POST',
		body: JSON.stringify({
			ingredients: productsId
		}),
		headers: config.headers
	});
	return checkResponse(res);
}

export const getIngredientsData = async () => {
	const res = await fetch(`${config.url}/ingredients`, {
		method: 'GET',
		headers: config.headers
	});
	return checkResponse(res);
}

