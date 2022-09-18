export const CLOSE_INGREDIENT_DETAILS_MODAL = 'CLOSE_INGREDIENT_DETAILS_MODAL';
export const CLOSE_ORDER_INFO_MODAL = 'CLOSE_ORDER_INFO_MODAL';

export const closeOrderInfoModal = () => {
	return {
		type: CLOSE_ORDER_INFO_MODAL,
	};
}

export const closeIngredientModal = () => {
	return {
		type: CLOSE_INGREDIENT_DETAILS_MODAL,
	};
}