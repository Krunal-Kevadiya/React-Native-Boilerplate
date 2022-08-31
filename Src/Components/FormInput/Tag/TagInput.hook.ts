import { useCallback, useMemo } from 'react';
import { useTheme } from 'rn-custom-style-sheet';
import { StringConst } from '@constants';
import { useClipboard } from '@hooks';
import { Colors } from '@themes';
import type { ParseType, UseTagInputReturnType } from './TagInput.type';
import { ToastHolder } from '../../Toast';
import styleSheet from './TagInput.style';
import { PatternsEnum } from './TagInput.type';
import { callActions, PATTERNS } from './TagInput.util';

export default function useTagInput(handlePress?: (type: string, value: string) => void): UseTagInputReturnType {
  const [, setStringToClipboard] = useClipboard();
  const styles = useTheme(styleSheet);

  const handlePhonePress = useCallback<(phone: string) => void>((phone) => {
    callActions(phone, PatternsEnum.phone);
  }, []);

  const handleEmailPress = useCallback<(email: string) => void>((email) => {
    callActions(email, PatternsEnum.email);
  }, []);

  const handleUrlPress = useCallback<(url: string) => void>((url) => {
    const modifyUrl = url.replace(/https:/i, 'https:').replace(/http:/i, 'http:');
    callActions(modifyUrl, PatternsEnum.url);
  }, []);

  const handleUrlLongPress = useCallback<(url: string) => void>((url) => {
    setStringToClipboard(url);
    ToastHolder.toastMessage(StringConst.message.copyLinkSuccess);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHashtagPress = useCallback<(hashtag: string) => void>(
    (hashtag) => {
      handlePress?.('Hashtag', hashtag);
    },
    [handlePress]
  );

  const handleUnderlinePress = useCallback<(underline: string) => void>(
    (underline) => {
      handlePress?.('Underline', underline);
    },
    [handlePress]
  );

  const parseArrayJson = useMemo<ParseType[]>(
    () => [
      {
        type: PatternsEnum.phone,
        pattern: PATTERNS[PatternsEnum.phone],
        style: { ...styles.phone, color: Colors.lightBlue },
        onPress: handlePhonePress
      },
      {
        type: PatternsEnum.email,
        pattern: PATTERNS[PatternsEnum.email],
        style: { ...styles.email, color: Colors.lightBlue },
        onPress: handleEmailPress
      },
      {
        type: PatternsEnum.url,
        pattern: PATTERNS[PatternsEnum.url],
        style: { ...styles.url, color: Colors.secondary },
        onPress: handleUrlPress,
        onLongPress: handleUrlLongPress
      },
      {
        type: PatternsEnum.username,
        pattern: PATTERNS[PatternsEnum.username],
        style: { ...styles.username, color: Colors.secondary }
      },
      {
        type: PatternsEnum.hashtag,
        pattern: PATTERNS[PatternsEnum.hashtag],
        style: { ...styles.hashtag, color: Colors.secondary },
        onPress: handleHashtagPress
      },
      { type: PatternsEnum.boldWith2Star, pattern: PATTERNS[PatternsEnum.boldWith2Star], style: styles.bold },
      {
        type: PatternsEnum.boldWith2Underscore,
        pattern: PATTERNS[PatternsEnum.boldWith2Underscore],
        style: styles.bold
      },
      { type: PatternsEnum.italicWith1Star, pattern: PATTERNS[PatternsEnum.italicWith1Star], style: styles.italic },
      {
        type: PatternsEnum.italicWith1Underscore,
        pattern: PATTERNS[PatternsEnum.italicWith1Underscore],
        style: styles.italic
      },
      { type: PatternsEnum.strikethrough, pattern: PATTERNS[PatternsEnum.strikethrough], style: styles.strikethrough },
      {
        type: PatternsEnum.underline,
        pattern: PATTERNS[PatternsEnum.underline],
        style: styles.underline,
        onPress: handleUnderlinePress
      },
      {
        type: PatternsEnum.blockquote,
        pattern: PATTERNS[PatternsEnum.blockquote],
        style: {
          ...styles.blockquote,
          backgroundColor: Colors.gray,
          borderColor: Colors.gray
        }
      },
      { type: PatternsEnum.newLine, pattern: PATTERNS[PatternsEnum.newLine], style: {} },
      { type: PatternsEnum.lineBreak, pattern: PATTERNS[PatternsEnum.lineBreak], style: {} }
    ],
    [
      styles,
      handleEmailPress,
      handlePhonePress,
      handleUrlPress,
      handleHashtagPress,
      handleUnderlinePress,
      handleUrlLongPress
    ]
  );

  return { parseArrayJson };
}
