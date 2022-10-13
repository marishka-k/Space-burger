import { nanoid } from "nanoid";
import {
  CONSTRUCTOR_ADD,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_MOVE,
} from "../action-types/constructor-types";
import { TConstructorIngredient } from "../types/data";

export interface IConstructorAdd {
  readonly type: typeof CONSTRUCTOR_ADD;
  readonly payload: TConstructorIngredient;
}

export interface IConstructorDelete {
  readonly type: typeof CONSTRUCTOR_DELETE;
  id: string;
}

export interface IConstructorReset {
  readonly type: typeof CONSTRUCTOR_RESET;
  data?: TConstructorIngredient[];
}

export interface IConstructorMove {
  readonly type: typeof CONSTRUCTOR_MOVE;
  readonly payload: {
    from: number;
    to: number;
  };
}

export const addItemToConstructor = (ingredient: TConstructorIngredient) => {
  return {
    type: CONSTRUCTOR_ADD,
    payload: { ...ingredient, id: nanoid() },
  };
};

export type TConstructorActions =
  | IConstructorAdd
  | IConstructorDelete
  | IConstructorReset
  | IConstructorMove;
