import { Dimensions, Platform, type ScaledSize } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { windowWidth, windowHeight } from 'rn-custom-style-sheet';

/**
 * Get the width and height of the screen.
 * @returns {ScaledSize} - the width and height of the screen.
 */
export const { width: screenWidth, height: screenHeight }: ScaledSize = Dimensions.get('screen');

/**
 * Returns true if the current platform is Android.
 * @returns {boolean} - true if the current platform is Android.
 */
export const isAndroid: boolean = Platform.OS === 'android';

/**
 * Returns true if the current platform is iOS.
 * @returns {boolean} - True if the current platform is iOS.
 */
export const isIos: boolean = Platform.OS === 'ios';

/**
 * Returns true if the current platform is Web.
 * @returns {boolean} - True if the current platform is Web.
 */
export const isWeb: boolean = Platform.OS === 'web';

/**
 * Returns true if the current platform is tablet.
 * @returns {boolean} - True if the current platform is tablet.
 */
export const isTablet: boolean =
  (Platform.OS === 'ios' && Platform.isPad) || DeviceInfo.getDeviceType() === 'Tablet';

/**
 * Returns true if the screen height is greater than 750 pixels.
 * @returns {boolean} - True if the screen height is greater than 750 pixels.
 */
export const isLargeDisplay: boolean = screenHeight > 750;

const isDensity780: boolean = windowHeight === 780 || windowWidth === 780;
const isDensity812: boolean = windowHeight === 812 || windowWidth === 812;
const isDensity844: boolean = windowHeight === 844 || windowWidth === 844;
const isDensity896: boolean = windowHeight === 896 || windowWidth === 896;
const isDensity926: boolean = windowHeight === 926 || windowWidth === 926;
const iphoneXDisplay: boolean =
  isDensity780 || isDensity812 || isDensity844 || isDensity896 || isDensity926;
/**
 * Returns true if the device is an iPhone X.
 * @returns {boolean} - true if the device is an iPhone X.
 */
export function isIphoneX(): boolean {
  if (Platform.OS === 'ios') {
    return !Platform.isPad && !Platform.isTV && iphoneXDisplay;
  }
  return false;
}
