import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { isAndroid } from '@themes';

export function changeScreenOrientation(isLockPortrait: boolean): void {
  if (isLockPortrait) {
    // this locks the view to Portrait Mode
    Orientation.lockToPortrait();
  } else {
    // this unlocks any previous locks to all Orientations
    Orientation.unlockAllOrientations();
  }
}

export function isLandscapeMore(orientation: string): boolean {
  const isLandscape = orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT';
  return isLandscape;
}

export function initialOrientation(callback: (initial: OrientationType) => void): void {
  const initial = Orientation.getInitialOrientation();
  callback(initial);
}

export function addOrientationListener(callback: (orientation: OrientationType) => void): void {
  Orientation.addOrientationListener(callback);
  isAndroid && Orientation.addDeviceOrientationListener(callback);
}

export function removeOrientationListener(callback: (orientation: OrientationType) => void): void {
  Orientation.removeOrientationListener(callback);
  isAndroid && Orientation.removeDeviceOrientationListener(callback);
}
