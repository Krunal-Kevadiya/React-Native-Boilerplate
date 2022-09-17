/**
 * An enum of the possible paths in the application deeplink.
 */
enum DeepLinkEnum {
  // reactNativeStructure://m/<meeting id>
  MEETING = 'm',
  // reactNativeStructure://new&lang=en
  SIGN_IN_WITH_EMAIL_LINK = 'new&lang=en',
  // reactNativeStructure://?toastMessage=<message content>
  TOAST_MESSAGE = 'toastMessage'
}
export default DeepLinkEnum;
