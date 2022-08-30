import { useState } from 'react';
import { Keyboard, type KeyboardEvent, type ScreenRect } from 'react-native';
import useLifecycle from './LifecycleHook';

const emptyCoordinates: ScreenRect = Object.freeze({
  screenX: 0,
  screenY: 0,
  width: 0,
  height: 0
});

const initialValue = {
  start: emptyCoordinates,
  end: emptyCoordinates
};

type CoordinatesType = {
  start?: ScreenRect;
  end?: ScreenRect;
};

export default function useKeyboard(): [boolean, CoordinatesType, number] {
  const [shown, setShown] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<CoordinatesType>(initialValue);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  function handleKeyboardWillShow(e: KeyboardEvent): void {
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
  }
  function handleKeyboardDidShow(e: KeyboardEvent): void {
    setShown(true);
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
    setKeyboardHeight(e.endCoordinates.height);
  }
  function handleKeyboardWillHide(e: KeyboardEvent): void {
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
  }
  function handleKeyboardDidHide(e: KeyboardEvent): void {
    setShown(false);
    if (e) {
      setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
    } else {
      setCoordinates(initialValue);
      setKeyboardHeight(0);
    }
  }

  useLifecycle(
    () => {
      Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow);
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
      Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide);
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
    },
    () => {
      Keyboard.removeListener('keyboardWillShow', handleKeyboardWillShow);
      Keyboard.removeListener('keyboardDidShow', handleKeyboardDidShow);
      Keyboard.removeListener('keyboardWillHide', handleKeyboardWillHide);
      Keyboard.removeListener('keyboardDidHide', handleKeyboardDidHide);
    }
  );

  return [shown, coordinates, keyboardHeight];
}
