import { DeviceEventEmitter, type EmitterSubscription } from 'react-native';

export enum EventBusNameEnum {
  PLAYING = 'PLAYING'
}

type PayerEventKey = 'TranscriptSeek';
type EventBusKey = PayerEventKey;

export function emitEventBus(eventName: EventBusNameEnum, key: EventBusKey, value: any): void {
  const data = Object.freeze({
    [key]: value
  });
  DeviceEventEmitter.emit(eventName, data);
}

export function eventBusListener(eventName: EventBusNameEnum, callback: (data: Object) => void): EmitterSubscription {
  return DeviceEventEmitter.addListener(eventName, callback);
}
