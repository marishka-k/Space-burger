export const INGREDIENT_DETAILS_OPEN = 'INGREDIENT_DETAILS_OPEN';
export const INGREDIENT_DETAILS_CLOSE = 'INGREDIENT_DETAILS_CLOSE';

export const openIngredientModal = (ingredient) => {
	return {
		type: INGREDIENT_DETAILS_OPEN,
		ingredient: ingredient
	};
}

export const closeIngredientModal = () => {
	return {
		type: INGREDIENT_DETAILS_CLOSE,
	};
}