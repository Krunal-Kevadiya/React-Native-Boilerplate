import { i18n } from '@configs';

const codePush = Object.freeze({
  textCheckingForUpdate: i18n.t('codePush:textCheckingForUpdate'),
  textAwaitingUserAction: i18n.t('codePush:textAwaitingUserAction'),
  textInstallingUpdate: i18n.t('codePush:textInstallingUpdate'),
  textAppUpToDate: i18n.t('codePush:textAppUpToDate'),
  textUpdateCancelledByUser: i18n.t('codePush:textUpdateCancelledByUser'),
  textUpdateInstalledAndWillBeAppliedOnRestart: i18n.t('codePush:textUpdateInstalledAndWillBeAppliedOnRestart'),
  textAnUnknownErrorOccurred: i18n.t('codePush:textAnUnknownErrorOccurred'),
  textDownloadingPackage: i18n.t('codePush:textDownloadingPackage'),
  btnRestart: i18n.t('codePush:btnRestart')
});

const apiError = Object.freeze({
  network: i18n.t('apiError:msgNetworkError'),
  server: i18n.t('apiError:msgServerError'),
  somethingWentWrong: i18n.t('apiError:msgSomethingWentWrong'),
  cancelSaga: i18n.t('apiError:msgCancelSagaError'),
  processingVideo: i18n.t('apiError:msgProcessingVideo'),
  processingError: i18n.t('apiError:msgProcessingError')
});

const yupError = Object.freeze({
  requireEmail: i18n.t('yupError:msgRequireEmail'),
  validEmail: i18n.t('yupError:msgValidEmail'),
  requirePassword: i18n.t('yupError:msgRequirePassword')
});

const message = Object.freeze({
  copyLinkSuccess: i18n.t('message:copyLinkSuccess')
});

const imagePicker = Object.freeze({
  textSelectAPhoto: i18n.t('imagePicker:textSelectAPhoto'),
  listSelectAPhoto: [
    i18n.t('imagePicker:listItemTakePhoto'),
    i18n.t('imagePicker:listItemChooseFromLibrary'),
    i18n.t('imagePicker:listItemCancel')
  ]
});

const signIn = Object.freeze({
  textEmail: i18n.t('signIn:textEmail'),
  inputEmail: i18n.t('signIn:inputEmail'),
  textPassword: i18n.t('signIn:textPassword'),
  inputPassword: i18n.t('signIn:inputPassword'),
  btnSignIn: i18n.t('signIn:btnSignIn'),
  textSignInDesc: i18n.t('signIn:textSignInDesc')
});

const StringConst = Object.freeze({
  codePush,
  apiError,
  yupError,
  message,
  imagePicker,
  signIn
});

export default StringConst;
