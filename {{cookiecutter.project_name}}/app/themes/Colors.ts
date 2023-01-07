/**
 * A collection of colors used in the theme.
 * @type {Object}
 */
const themeColors: Record<string, string> = {
  primary: '#141414',
  secondary: '#F1C336',
  gray: '#7B7B7B',
  error: '#E53E3E',
  pink: '#BA25EB',
  orange: '#F39C3C',
  lightBlue: '#3787FC',
  red: '#DD2C2C',
  darkBlue: '#374dfc',
  transparent: 'transparent'
};

/**
 * A collection of common colors used in the theme.
 * @type {Object}
 */
const commonColors: Record<string, string> = {
  white: '#FFFFFF',
  black: '#000000',
  transparentBlack: '#00000000',
  transparentWhite: '#FFFFFF00'
};

/**
 * A light theme object.
 * @returns {ThemeColors}
 */
const light: Record<string, string> = {
  ...themeColors,
  ...commonColors,
  invertedBlack: commonColors.black,
  invertedWhite: commonColors.white,
  invertedTransparentWhite: commonColors.transparentWhite,
  invertedTransparentBlack: commonColors.transparentBlack
};

/**
 * A dark theme object.
 * @returns {ThemeColors}
 */
const dark: Record<string, string> = {
  ...themeColors,
  ...commonColors,
  invertedBlack: commonColors.white,
  invertedWhite: commonColors.black,
  invertedTransparentWhite: commonColors.transparentBlack,
  invertedTransparentBlack: commonColors.transparentWhite
};

export default { light, dark };
