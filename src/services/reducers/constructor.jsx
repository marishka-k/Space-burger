import {
  CONSTRUCTOR_ADD,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_MOVE,
  CONSTRUCTOR_RESET,
} from "../action-types/constructor-types";

const initialState = {
  bun: null,
  fillings: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD: {
      if (action.payload.type === "bun") {
        return { ...state, bun: action.payload };
      }
      return {
        ...state,
        fillings: [...state.fillings, action.payload],
      };
    }

    case CONSTRUCTOR_DELETE: {
      return {
        ...state,
        fillings: [...state.fillings].filter((item) => {
          return item.id !== action.id;
        }),
      };
    }

    case CONSTRUCTOR_RESET: {
      return {
        ...state,
        bun: null,
        fillings: [],
      };
    }

    case CONSTRUCTOR_MOVE: {
      const dragConstructor = [...state.fillings];
      dragConstructor.splice(
        action.payload.to,
        0,
        dragConstructor.splice(action.payload.from, 1)[0]
      );

      return { ...state, fillings: dragConstructor };
    }

    default: {
      return state;
    }
  }
};
