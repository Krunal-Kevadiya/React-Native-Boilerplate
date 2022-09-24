import Orientation, { OrientationType } from 'react-native-orientation-locker';

import { isAndroid } from '@themes';

/**
 * Changes the screen orientation to either portrait or landscape.
 * @param {boolean} isLockPortrait - whether to lock the screen to portrait.
 * @returns None
 */
export function changeScreenOrientation(isLockPortrait: boolean): void {
  if (isLockPortrait) {
    // this locks the view to Portrait Mode
    Orientation.lockToPortrait();
  } else {
    // this unlocks any previous locks to all Orientations
    Orientation.unlockAllOrientations();
  }
}

/**
 * Returns true if the orientation is landscape.
 * @param {string} orientation - the orientation of the device.
 * @returns {boolean} - true if the orientation is landscape.
 */
export function isLandscapeMore(orientation: string): boolean {
  const isLandscape = orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT';
  return isLandscape;
}

/**
 * Gets the initial orientation of the device.
 * @param {(initial: OrientationType) => void} callback - the callback function to call with the initial orientation.
 * @returns None
 */
export function initialOrientation(callback: (initial: OrientationType) => void): void {
  const initial = Orientation.getInitialOrientation();
  callback(initial);
}

/**
 * Adds a listener to the orientation change event.
 * @param {(orientation: OrientationType) => void} callback - the callback function to call when the orientation change event is fired.
 * @returns None
 */
export function addOrientationListener(callback: (orientation: OrientationType) => void): void {
  Orientation.addOrientationListener(callback);
  isAndroid && Orientation.addDeviceOrientationListener(callback);
}

/**
 * Remove the listener for orientation changes.
 * @param {(orientation: OrientationType) => void} callback - the callback to remove.
 * @returns None
 */
export function removeOrientationListener(callback: (orientation: OrientationType) => void): void {
  Orientation.removeOrientationListener(callback);
  isAndroid && Orientation.removeDeviceOrientationListener(callback);
}
