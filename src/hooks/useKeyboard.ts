import { useEffect, useState } from 'react';
import { Keyboard, type KeyboardEvent, type ScreenRect } from 'react-native';

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

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow),
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
      Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide),
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide)
    ];
    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, []);

  return [shown, coordinates, keyboardHeight];
}
