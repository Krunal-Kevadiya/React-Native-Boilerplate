import Clipboard from '@react-native-clipboard/clipboard';
import { useState } from 'react';

import useDidMount from './useDidMount';
import useLifecycle from './useLifecycle';

type Listener = (content: string) => void;
const listeners = new Set<Listener>();

function setString(content: string): void {
  Clipboard.setString(content);
  listeners.forEach((listener) => listener(content));
}

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
