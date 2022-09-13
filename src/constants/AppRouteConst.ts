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

export const ExcludeTrackAppRoute = [AppRouteEnum.LAUNCH, AppRouteEnum.AUTH, AppRouteEnum.HOME];
