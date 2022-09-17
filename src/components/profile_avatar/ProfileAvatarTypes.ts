import type { TextStyle, ViewStyle } from 'react-native';
import type { XmlProps } from 'react-native-svg';

/**
 * A component that displays a profile avatar.
 * @param {ProfileAvatarPropsType} props - the props for the component.
 */
type ProfileAvatarPropsType = {
  url?: string;
  size?: number;
  image?: string | number;
  text?: string;
  source?: string | number;
  style: ViewStyle;
  textStyle?: TextStyle;
  svgStyle?: XmlProps;
  onPress?: () => void;
};

export default ProfileAvatarPropsType;
