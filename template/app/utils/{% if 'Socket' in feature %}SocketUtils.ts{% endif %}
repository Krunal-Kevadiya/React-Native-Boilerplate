import * as IO from 'socket.io-client';

const EVENTS = {
  CONNECT: 'connect',
  ERROR: 'connect_error',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message'
};

/**
 * A wrapper for the socket.io library.
 * @param {string | Partial<IO.ManagerOptions & IO.SocketOptions>} uri - The uri of the socket.io server.
 * @param {Partial<IO.ManagerOptions & IO.SocketOptions>} [opts] - The options for the socket.io server.
 * @returns None
 */
export class SocketWrapper {
  private onChange?: (isConnected: boolean) => void;

  private onMessage?: (message: any) => void;

  private socket?: IO.Socket;

  /**
   * Creates a new instance of the WebSocketClient class.
   * @param {(isConnected: boolean) => void} [onChange] - A callback function that is called when the connection status changes.
   * @param {(message: any) => void} [onMessage] - A callback function that is called when a message is received.
   */
  constructor(onChange?: (isConnected: boolean) => void, onMessage?: (message: any) => void) {
    this.onChange = onChange;
    this.onMessage = onMessage;
  }

  /* A function that is used to add a listener to the socket.io server. */
  private addListener = (eventName: string, listener: any): void => {
    this.socket?.off(eventName, () => {});
    this.socket?.on(eventName, listener);
  };

  /* A callback function that is called when the connection status changes. */
  private onConnectionChanged = (): void => {
    this.onChange?.(this.socket?.connected ?? false);
  };

  /* A callback function that is called when a message is received. */
  private onMessaged = (message: any): void => {
    this.onMessage?.(message);
  };

  /* Adding a listener to the socket.io server. */
  private onConnected = (): void => {
    this.addListener(EVENTS.MESSAGE, this.onMessaged);
    this.onConnectionChanged();
  };

  /* A function that is called when the socket is disconnected. */
  private onDisconnected = (/* reason: IO.Socket.DisconnectReason */): void => {
    this.onConnectionChanged();
  };

  /* A function that is called when the socket is connected. */
  private onError = (/* error: Error */): void => {
    this.onConnectionChanged();
  };

  /* A function that is called when the socket is connected. */
  public connect = (
    uri: string | Partial<IO.ManagerOptions & IO.SocketOptions>,
    opts: Partial<IO.ManagerOptions & IO.SocketOptions> = {
      forceNew: true, // Whether to create a new Manager instance.
      multiplex: true, // The opposite of forceNew: whether to reuse an existing Manager instance.
      transports: ['websocket', 'polling'], // use WebSocket first, if available
      timeout: 20000, // The timeout in milliseconds for each connection attempt.
      autoConnect: true, // Whether to automatically connect upon creation. If set to false, you need to manually connect:
      reconnection: true, // Whether reconnection is enabled or not. If set to false, you need to manually reconnect
      reconnectionDelay: 1000, // The initial delay before reconnection in milliseconds
      reconnectionDelayMax: 5000, // The maximum delay between two reconnection attempts. Each attempt increases the reconnection delay by 2x.
      reconnectionAttempts: Infinity // The number of reconnection attempts before giving up.
    }
  ): void => {
    // @ts-ignore
    this.socket = IO(uri, opts);
    this.addListener(EVENTS.CONNECT, this.onConnected);
    this.addListener(EVENTS.ERROR, this.onError);
    this.addListener(EVENTS.DISCONNECT, this.onDisconnected);
  };

  /* Sending a message to the server. */
  public sendEmitter = (message: any): void => {
    if (typeof this.socket?.emit === 'function' && this.socket?.connected) {
      this.socket?.emit(EVENTS.MESSAGE, message);
    }
  };

  /* Removing all the listeners from the socket. */
  public disconnect = (): void => {
    this.socket?.off(EVENTS.CONNECT, () => {});
    this.socket?.off(EVENTS.ERROR, () => {});
    this.socket?.off(EVENTS.MESSAGE, () => {});
    this.socket?.off(EVENTS.DISCONNECT, () => {});
    this.socket?.close();
  };
}
