export type TUser = {
	email: string;
	name: string;
	createdAt?: string;
	updatedAt?: string;
}

export type TIngredient = {
	calories: number;
	carbohydrates: number;
	fat: number;
	image: string;
	image_large: string;
	image_mobile: string;
	name: string;
	price: number;
	proteins: number;
	type: "bun" | "main" | "sauce";
	__v: number;
	_id: string;
	count?: number;
}

export type TConstructorIngredient = TIngredient & {
	id: string;
}