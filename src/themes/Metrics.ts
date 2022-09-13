import { Dimensions, Platform, type ScaledSize } from 'react-native';
import { windowWidth, windowHeight } from 'rn-custom-style-sheet';

export const { width: screenWidth, height: screenHeight }: ScaledSize = Dimensions.get('screen');

export const isAndroid: boolean = Platform.OS === 'android';
export const isIos: boolean = Platform.OS === 'ios';
export const isLargeDisplay: boolean = screenHeight > 750;

const isDensity780: boolean = windowHeight === 780 || windowWidth === 780;
const isDensity812: boolean = windowHeight === 812 || windowWidth === 812;
const isDensity844: boolean = windowHeight === 844 || windowWidth === 844;
const isDensity896: boolean = windowHeight === 896 || windowWidth === 896;
const isDensity926: boolean = windowHeight === 926 || windowWidth === 926;
const iphoneXDisplay: boolean = isDensity780 || isDensity812 || isDensity844 || isDensity896 || isDensity926;
export function isIphoneX(): boolean {
  if (Platform.OS === 'ios') {
    return !Platform.isPad && !Platform.isTVOS && iphoneXDisplay;
  }
  return false;
}
