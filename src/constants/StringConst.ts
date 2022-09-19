import { i18n } from '@configs';

/**
 * An object that contains all of the possible messages that can be returned by code push.
 * @readonly
 * @enum {string}
 */
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

/**
 * An object that contains all of the possible error messages that can be returned by the API.
 * @readonly
 * @enum {string}
 */
const apiError = Object.freeze({
  network: i18n.t('apiError:msgNetworkError'),
  server: i18n.t('apiError:msgServerError'),
  somethingWentWrong: i18n.t('apiError:msgSomethingWentWrong'),
  cancelSaga: i18n.t('apiError:msgCancelSagaError'),
  timeout: i18n.t('apiError:msgTimeoutError'),
  client: i18n.t('apiError:msgClientError'),
  cancel: i18n.t('apiError:msgCancelError'),
  connection: i18n.t('apiError:msgConnectionError'),
  unexpected: i18n.t('apiError:msgUnexpectedError')
});

/**
 * A collection of error messages for the Yup validation schema.
 * @type {Object}
 */
const yupError = Object.freeze({
  requireEmail: i18n.t('yupError:msgRequireEmail'),
  validEmail: i18n.t('yupError:msgValidEmail'),
  requirePassword: i18n.t('yupError:msgRequirePassword')
});

/**
 * A collection of messages for the application.
 * @type {Object}
 */
const message = Object.freeze({
  copyLinkSuccess: i18n.t('message:copyLinkSuccess'),
  fetchMustBeFunction: i18n.t('message:fetchMustBeFunction'),
  defaultsMustBeObject: i18n.t('message:defaultsMustBeObject'),
  retriesMustBePositiveInteger: i18n.t('message:retriesMustBePositiveInteger'),
  retryDelayMustNePositiveInteger: i18n.t('message:retryDelayMustNePositiveInteger'),
  retryOnPropertyExpectsArrayOrFunction: i18n.t('message:retryOnPropertyExpectsArrayOrFunction'),
  stringInvalidFormat: i18n.t('message:stringInvalidFormat'),
  stringArgumentIndexOutOfRangeInFormat: i18n.t('message:stringArgumentIndexOutOfRangeInFormat')
});

/**
 * A collection of messages for the components.
 * @type {Object}
 */
const components = Object.freeze({
  textSelectAPhoto: i18n.t('components:textSelectAPhoto'),
  listSelectAPhoto: [
    i18n.t('components:listItemTakePhoto'),
    i18n.t('components:listItemChooseFromLibrary'),
    i18n.t('components:listItemCancel')
  ]
});

const auth = Object.freeze({
  textEmail: i18n.t('auth:textEmail'),
  inputEmail: i18n.t('auth:inputEmail'),
  textPassword: i18n.t('auth:textPassword'),
  inputPassword: i18n.t('auth:inputPassword'),
  btnSignIn: i18n.t('auth:btnSignIn'),
  textSignInDesc: i18n.t('auth:textSignInDesc')
});

/**
 * Exporting all the strings in one object..
 * Separate string object like Home, Setting & Auth etc...
 * base on your modules dir structure
 * @type {Object.<string, Record<string, string>}
 */
export default Object.freeze({
  codePush,
  apiError,
  yupError,
  message,
  components,
  auth
});
