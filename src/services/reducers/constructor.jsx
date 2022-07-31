import {
  CONSTRUCTOR_ADD,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_MOVE,
} from "../actions/constructor";

const initialState = {
  bun: null,
  ingredients: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD: {
      if (action.payload.type === "bun") {
        return { ...state, bun: action.payload };
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.data],
      };
    }

    case CONSTRUCTOR_DELETE: {
      return {
        ...state,
        items: [...state.items].filter((item) => {
          return item.id !== action.id;
        }),
      };
    }

    case CONSTRUCTOR_RESET: {
      return {
        ...state,
        bun: null,
        ingredients: [],
      };
    }

    case CONSTRUCTOR_MOVE: {
      const dragConstructor = [...state.items];
      dragConstructor.splice(
        action.data.dragIndex,
        0,
        dragConstructor.splice(action.data.hoverIndex, 1)[0]
      );

      return {
        ...state,
        items: dragConstructor,
      };
    }

    default: {
      return state;
    }
  }
};
