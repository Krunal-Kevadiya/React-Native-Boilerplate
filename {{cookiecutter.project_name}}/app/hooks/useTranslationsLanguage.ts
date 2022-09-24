import * as RNLocalize from 'react-native-localize';
import { i18n } from '@configs';
import useLifecycle from './useLifecycle';

/**
 * A translations language hook that listens for changes in the device's language and updates the
 * i18n language accordingly.
 */
export default function useTranslationsLanguage(): void {
  /**
   * A function that is called when the device language is changed.
   * @returns None
   */
  function onLocalizationChange(): void {
    const deviceLang = RNLocalize.getLocales()[0].languageCode;
    i18n.changeLanguage(deviceLang);
    // TODO: If need to force restart app then unable
    // CodePush.allowRestart();
  }

  useLifecycle(
    () => {
      RNLocalize.addEventListener('change', onLocalizationChange);
    },
    () => {
      RNLocalize.removeEventListener('change', onLocalizationChange);
    }
  );
}
