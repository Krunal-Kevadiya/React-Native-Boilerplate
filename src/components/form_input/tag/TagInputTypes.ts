import type { StyleProp, TextInputProps, TextStyle } from 'react-native';

export enum PatternsEnum {
  phone = 'phone',
  email = 'email',
  url = 'url',
  username = 'username',
  hashtag = 'hashtag',
  boldWith2Star = 'boldWith2Star',
  boldWith2Underscore = 'boldWith2Underscore',
  italicWith1Star = 'boldWith1Star',
  italicWith1Underscore = 'boldWith1Underscore',
  strikethrough = 'strikethrough',
  underline = 'underline',
  blockquote = 'blockquote',
  newLine = 'newLine',
  lineBreak = 'lineBreak'
}

export type ParseType = {
  type: PatternsEnum;
  pattern: RegExp;
  nonExhaustiveModeMaxMatchCount?: number;
  style?: TextStyle;
  onPress?: (value: string, index?: number) => void;
  onLongPress?: (value: string, index?: number) => void;
  renderText?: (text: string, matches: RegExpExecArray | null) => string;
} & TextInputProps;

export const defaultProps = {
  editable: false,
  isPlayerUI: false,
  childrenProps: {
    multiline: true
  },
  selectionProps: {
    selectable: true
  }
};

export type TagInputPropsType = {
  isCollapse?: boolean;
  isPlayerUI?: boolean;
  handlePress?: (type: string, value: string) => void;
  parse?: ParseType[];
  values: string;
  childrenProps?: Record<string, any>;
  selectionProps?: Record<string, any>;
} & TextInputProps;

export type MatchPartType = {
  type?: PatternsEnum;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
  children: string;
  matched?: boolean;
};

export type UseTagInputReturnType = Required<{
  parseArrayJson: ParseType[];
}>;
