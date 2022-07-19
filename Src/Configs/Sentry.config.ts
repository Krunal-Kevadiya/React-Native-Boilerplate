import * as Sentry from '@sentry/react-native';
import { AppConst } from '@constants';
import { UserResponse } from '@models';

export function initSentry(): void {
  Sentry.init({
    dsn: AppConst.sentryUrl,
    environment: AppConst.isDevelopment ? 'development' : 'production',
    debug: AppConst.isDevelopment
  });
}

export function sentryCaptureMessage(eventName: string, request: object | null, error: object | null): void {
  Sentry.withScope((scope) => {
    scope.setExtra(eventName, {
      Request: JSON.stringify(request ?? {}),
      Error: JSON.stringify(error ?? {})
    });
    Sentry.captureMessage(eventName);
  });
}

export function sentryCaptureException(error: Error): void {
  if (AppConst.isDevelopment) {
    // eslint-disable-next-line no-restricted-syntax
    console.log(error);
  } else {
    Sentry.captureException(error);
  }
}

export function loginSentry(user: UserResponse): void {
  Sentry.setUser({
    id: String(user.id),
    displayName: user.displayName,
    realName: user.displayName,
    email: user.email,
    phone: user.phone
  });
}
