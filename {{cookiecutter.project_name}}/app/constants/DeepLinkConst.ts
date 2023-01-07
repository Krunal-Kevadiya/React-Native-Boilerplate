export const domain: string = '{{cookiecutter.deep_link_host}}';

export const bundleId: string = '{{cookiecutter.bundle_identifier}}';

export const deepLinkPrefixes = ['{{cookiecutter.deep_link_scheme}}://', `${domain}//`, `https://${domain}`];

/**
 * An enum of the possible paths in the application deeplink.
 */
enum DeepLinkEnum {
  // {{cookiecutter.deep_link_scheme}}://magic_link&lang=en&tenantId=austin-electrical-qqm76
  MagicLink = 'magic_link',
  // {{cookiecutter.deep_link_scheme}}://forgot_password&lang=en&tenantId=austin-electrical-qqm76
  ForgotPassword = 'forgot_password',
  // {{cookiecutter.deep_link_scheme}}://?toastMessage=<message content>
  ToastMessage = 'toastMessage'
}
export default DeepLinkEnum;
