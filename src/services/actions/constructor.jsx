import { nanoid } from "nanoid";
import { CONSTRUCTOR_ADD } from "../action-types/constructor-types";

export const addItemToConstructor = (ingredient) => {
  return {
    type: CONSTRUCTOR_ADD,
    payload: { ...ingredient, id: nanoid() },
  };
};
