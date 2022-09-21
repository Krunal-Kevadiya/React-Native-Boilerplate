import type { StyleProp, TextInputProps, TextStyle } from 'react-native';

/**
 * An enum of all the patterns that can be used in the patterns array.
 * @enum {string} PatternsEnum
 */
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

/**
 * A type that represents the parse
 * @property {PatternsEnum} type - The type of pattern to match.
 * @property {RegExp} pattern - The pattern to match.
 * @property {number} nonExhaustiveModeMaxMatchCount - This is the maximum number of matches that will
 * be rendered. This is useful when you want to render only the first match.
 * @property {TextStyle} style - This is the style that will be applied to the matched text.
 * @property onPress - A callback function that is called when the user taps on the text.
 * @property onLongPress - This is a callback function that is called when the user long presses on the
 * text.
 * @property renderText - This is a function that takes in the text and the matches array and returns a
 * string. This is useful if you want to render the text differently than the default.
 */
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

/**
 * The props for the TagInput component.
 * @typedef {object} TagInputPropsType
 * @property {boolean} [isCollapse=false] - Whether or not the TagInput is in collapse mode.
 * @property {boolean} [isPlayerUI=false] - Whether or not the TagInput is in player UI mode.
 * @property {(type: string, value: string) => void} [handlePress] - The function to call when a tag is pressed.
 * @property {ParseType[]} [parse=[]] - The parse array to use when parsing the input.
 * @property {string}
 */
export type TagInputPropsType = {
  isCollapse?: boolean;
  isPlayerUI?: boolean;
  handlePress?: (type: string, value: string) => void;
  parse?: ParseType[];
  values: string;
  childrenProps?: Record<string, any>;
  selectionProps?: Record<string, any>;
} & TextInputProps;

/**
 * A type for the parts of a match.
 * @typedef {Object} MatchPartType
 * @property {PatternsEnum | undefined} type - The type of match.
 * @property {StyleProp<TextStyle> | undefined} style - The style of the match.
 * @property {() => void} onPress - The function to call when the match is pressed.
 * @property {() => void} onLongPress - The function to call when the match is long pressed.
 * @property {string} children - The text of the match.
 * @property {boolean} [matched=false] - Whether or not
 */
export type MatchPartType = {
  type?: PatternsEnum;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
  children: string;
  matched?: boolean;
};

/**
 * A type that represents the return type of tag input hooks
 * @param {string} code - the code to parse
 * @returns {ParseType[]} - an array of objects that can be used to create a TagInput component
 */
export type UseTagInputReturnType = Required<{
  parseArrayJson: ParseType[];
}>;
