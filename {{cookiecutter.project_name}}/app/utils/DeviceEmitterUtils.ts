import { DeviceEventEmitter, type EmitterSubscription } from 'react-native';

export enum EventBusNameEnum {
  PLAYING = 'PLAYING'
}

type PayerEventKey = 'TranscriptSeek';
type EventBusKey = PayerEventKey;

/**
 * Emits an event to the event bus.
 * @param {EventBusNameEnum} eventName - the name of the event to emit.
 * @param {EventBusKey} key - the key of the event to emit.
 * @param {any} value - the value of the event to emit.
 * @returns None
 */
export function emitEventBus(eventName: EventBusNameEnum, key: EventBusKey, value: any): void {
  const data = Object.freeze({
    [key]: value
  });
  DeviceEventEmitter.emit(eventName, data);
}

/**
 * Adds a listener to the event bus.
 * @param {EventBusNameEnum} eventName - the name of the event to listen to
 * @param {(data: Object) => void} callback - the callback to call when the event is emitted
 * @returns {EmitterSubscription} - the subscription to the event bus
 */
export function eventBusListener(
  eventName: EventBusNameEnum,
  callback: (data: Object) => void
): EmitterSubscription {
  return DeviceEventEmitter.addListener(eventName, callback);
}
