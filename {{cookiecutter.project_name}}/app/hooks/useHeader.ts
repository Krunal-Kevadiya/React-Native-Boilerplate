import { Platform } from 'react-native';
import { type Rect, useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { verticalScale } from 'rn-custom-style-sheet';

/**
 * A status bar hook returns the height of the status bar.
 * @returns {number} The height of the status bar.
 */
export function useStatusBarHeight(): number {
  const insets = useSafeAreaInsets();
  return insets.top;
}

/**
 * A header returns the height of the header.
 * @param {boolean} [modalPresentation=false] - Whether the header is being used in a modal presentation.
 * @returns {number} The height of the header.
 */
export function useHeaderHeight(modalPresentation: boolean = false): number {
  const frame: Rect = useSafeAreaFrame();
  const statusBarHeight: number = useStatusBarHeight();
  let headerHeight: number;

  const isLandscape = frame.width > frame.height;

  if (Platform.OS === 'ios') {
    if (Platform.isPad || Platform.isTV) {
      if (modalPresentation) {
        headerHeight = 56;
      } else {
        headerHeight = 50;
      }
    } else {
      if (isLandscape) {
        headerHeight = 32;
      } else {
        if (modalPresentation) {
          headerHeight = 56;
        } else {
          headerHeight = 44;
        }
      }
    }
  } else if (Platform.OS === 'android') {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }

  return verticalScale(headerHeight) + statusBarHeight;
}
