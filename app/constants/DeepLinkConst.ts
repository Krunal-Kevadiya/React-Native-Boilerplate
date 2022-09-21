/**
 * An enum of the possible paths in the application deeplink.
 */
enum DeepLinkEnum {
  // reactNativeBoilerplate://m/<meeting id>
  MEETING = 'm',
  // reactNativeBoilerplate://new&lang=en
  SIGN_IN_WITH_EMAIL_LINK = 'new&lang=en',
  // reactNativeBoilerplate://?toastMessage=<message content>
  TOAST_MESSAGE = 'toastMessage'
}
export default DeepLinkEnum;
