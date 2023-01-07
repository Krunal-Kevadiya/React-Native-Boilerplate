/**
 * A constant freezing object that contains the regex to the application.
 * @type {Object}
 */
export default Object.freeze({
  // For Format
  stringClean: /\s/g,
  stringArg: /{(\w+(:\w*)?)}/g,
  stringFormat: /{\d+}/,
  // For Deep link
  deepLinkQueryParamsMatch: /[?&]([^=#]+)=([^&#]*)/g,
  // Yup
  phone:
    /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
  phoneWithoutPlus:
    /(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
});
