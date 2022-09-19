/**
 * An enum of the possible routes in the application.
 */
enum AppRouteEnum {
  LAUNCH = 'Launch',
  AUTH = 'Auth',
  HOME = 'Home',

  // Launch Stack
  WEL_COME = 'WelComeScreen',

  // Auth Stack
  SIGN_IN = 'SignInScreen'
}
export default AppRouteEnum;

/**
 * An enum of the possible routes in the application which are not track in analytics.
 */
export const ExcludeTrackAppRoute = [AppRouteEnum.LAUNCH, AppRouteEnum.AUTH, AppRouteEnum.HOME];
