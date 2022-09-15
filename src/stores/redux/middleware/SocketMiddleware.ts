import { SocketWrapper } from '@utils';

import { AppRequestActions } from '../app_request';

import type { RootStateType } from '../Store';

export function socketMiddleware(argStore: RootStateType) {
  //@ts-ignore
  const { dispatch } = argStore;

  const onConnectionChange = (isConnected: boolean): void => {
    dispatch(isConnected);
  };

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
