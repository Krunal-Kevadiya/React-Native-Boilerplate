import Clipboard from '@react-native-clipboard/clipboard';
import { useState } from 'react';

import useDidMount from './useDidMount';
import useLifecycle from './useLifecycle';

/**
 * A listener type.
 * @param {string} content - the string to set in the clipboard
 * @returns None
 */
type Listener = (content: string) => void;

/* Creating a new set of listeners. */
const listeners = new Set<Listener>();

/**
 * Sets the string in the clipboard to the given content.
 * @param {string} content - the string to set in the clipboard
 * @returns None
 */
function setString(content: string): void {
  Clipboard.setString(content);
  listeners.forEach((listener) => listener(content));
}

/**
 * clipboard hook that returns a function that can be used to set the clipboard data.
 * @param {Boolean} [withGetValue=false] - Whether or not to get the current clipboard data.
 * @returns A function that can be used to set the clipboard data.
 */
export default function useClipboard(withGetValue: Boolean = false): [string, (content: string) => void] {
  const [data, updateClipboardData] = useState<string>('');

  // Get initial data
  useDidMount(() => {
    if (withGetValue) {
      Clipboard.getString().then(updateClipboardData);
    }
  }, [withGetValue]);

  // Listen for updates
  useLifecycle(
    () => {
      listeners.add(updateClipboardData);
    },
    () => {
      listeners.delete(updateClipboardData);
    }
  );

  return [data, setString];
}
