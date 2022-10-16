import { MiddlewareAPI } from "redux";
import { TSocketMiddlewareActions } from "../types/data";

export const socketMiddleware = (wsUrl: string, wsActions: TSocketMiddlewareActions) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, sendMessage } = wsActions;
      
      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
                       
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({
            type: onMessage,
            payload: restParsedData,
          });
        };

        socket.onclose = (event) => {
          dispatch({
            type: onClose,
            payload: event,
          });
        };

        if (sendMessage && type === sendMessage && socket ) {
          const orders = { ...payload };
          socket.send(JSON.stringify(orders));
        }
      }

      next(action);
    };
  };
};
