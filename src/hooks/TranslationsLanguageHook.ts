import * as RNLocalize from 'react-native-localize';
import { i18n } from '@configs';
import useLifecycle from './LifecycleHook';

export default function useTranslationsLanguage(): void {
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
