import { SocketWrapper } from '@utils';

import { AppRequestActions } from '../app_request';

import type { RootStateType } from '../Store';

/**
 * Creates a middleware that handles socket connections.
 * @param {RootStateType} argStore - The store of the application.
 * @returns None
 */
export function socketMiddleware(argStore: RootStateType) {
  //@ts-ignore
  const { dispatch } = argStore;

  /**
   * A function that dispatches the isConnected action.
   * @param {boolean} isConnected - the boolean value of whether the user is connected to the internet.
   * @returns None
   */
  const onConnectionChange = (isConnected: boolean): void => {
    dispatch(isConnected);
  };

  /**
   * Takes in a message and dispatches it to the redux store.
   * @param {any} message - the message to dispatch to the redux store.
   * @returns None
   */
  const onIncomingMessage = (message: any): void => {
    dispatch(message);
  };

  const socket = new SocketWrapper(onConnectionChange, onIncomingMessage);

  return (next: any) => (action: any) => {
    switch (action.type) {
      case AppRequestActions.connectSocket.type:
        socket.disconnect();
        socket.connect('here apply socket url');
        break;

      case AppRequestActions.disconnectSocket.type:
        socket.disconnect();
        break;

      default:
        break;
    }

    return next(action);
  };
}
