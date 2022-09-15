import { Linking } from 'react-native';

import { sentryCaptureException } from '@configs';
import { isIos } from '@themes';
import { isEmailFields, isPhoneFields } from '@utils';

import { PatternsEnum } from './TagInputTypes';

import type { MatchPartType, ParseType } from './TagInputTypes';

export const PATTERNS = Object.freeze({
  [PatternsEnum.phone]: /[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,7}/,
  [PatternsEnum.email]: /\S+@\S+\.\S+/,
  [PatternsEnum.url]:
    /(https?:\/\/|www\.|)[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\\+\\[\],.~#?&\\/=()]*[-a-zA-Z0-9@:%_\\+\]~#?&\\/=()])*/i,
  [PatternsEnum.username]: /@[a-z0-9#_.-]{3,30}/i,
  [PatternsEnum.hashtag]: /#[a-zA-Z0-9@:%-?&/._\\+~=]*/,
  [PatternsEnum.boldWith2Star]: /\*\*(.*?)\*\*/,
  [PatternsEnum.boldWith2Underscore]: /__(.*?)__/,
  [PatternsEnum.italicWith1Star]: /\*(.*?)\*/,
  [PatternsEnum.italicWith1Underscore]: /_(.*?)_/,
  [PatternsEnum.strikethrough]: /~~(.*?)~~/,
  [PatternsEnum.underline]: /~(.*?)~/,
  [PatternsEnum.blockquote]: /\s>\s([A-za-z 0-9@:%-?&/._\\+~=]*)/,
  [PatternsEnum.newLine]: /\\n/g,
  [PatternsEnum.lineBreak]: /<br>|<br >|<br\/>|<br \/>|<Br>|<Br >|<Br\/>|<Br \/>|<BR>|<BR >|<BR\/>|<BR \/>/
});

export function removeHtmlTags(values: string | undefined, isCollapse?: boolean): string {
  let newValues: string = (values ?? '').replace(/<(?!br|b|i|s|\/?(!br|b|i|s))[^>]+>/gi, '');
  newValues = newValues?.replace(/<(br\s*\/?)[^>]+>/gi, '\n');
  newValues = newValues?.replace(/<br+>/gi, '\n');
  newValues = newValues?.replace(/<(?!i|s|\/?(!i|s))[^>]+>/gi, '**');
  newValues = newValues?.replace(/<(?!s|\/?(!s))[^>]+>/gi, '*');
  newValues = newValues?.replace(/<[^>]+>/gi, '~~');
  if (isCollapse) {
    newValues = newValues?.replace(/\n\n+/g, ' ').replace(/  +/g, ' ');
  }
  return newValues;
}

function isInfixText(type: PatternsEnum, text: string, textLeft: string): boolean | string {
  switch (type) {
    case PatternsEnum.boldWith2Star:
      return text.startsWith('**') && text.endsWith('**') && text.length > 4;
    case PatternsEnum.boldWith2Underscore:
      return text.startsWith('__') && text.endsWith('__') && text.length > 4;
    case PatternsEnum.italicWith1Star:
      return text.startsWith('*') && text.endsWith('*') && text.length > 3;
    case PatternsEnum.italicWith1Underscore:
      return text.startsWith('_') && text.endsWith('_') && text.length > 3;
    case PatternsEnum.strikethrough:
      return text.startsWith('~~') && text.endsWith('~~') && text.length > 4;
    case PatternsEnum.underline:
      return text.startsWith('~') && text.endsWith('~') && text.length > 3;

    case PatternsEnum.blockquote:
      return text.startsWith(' >') && text.length > 2;
    case PatternsEnum.newLine: {
      const splitArray = textLeft.split('\\n');
      const isLength = splitArray.length >= 2;
      return text.trim() === '\\n' && isLength;
    }
    case PatternsEnum.lineBreak:
      return text.trim().toLowerCase() === '<br />' || text.trim().toLowerCase() === '<br/>';
    default:
      return text;
  }
}

function getMatchedPart(
  matchedPattern: ParseType,
  text: string,
  matches: RegExpExecArray | null,
  index: number
): MatchPartType {
  const props = Object.freeze({
    type: matchedPattern.type,
    style: matchedPattern.style,
    onPress: matchedPattern.onPress ? () => matchedPattern.onPress?.(text, index) : undefined,
    onLongPress: matchedPattern.onLongPress ? () => matchedPattern.onLongPress?.(text, index) : undefined
  });

  let children = text;
  if (matchedPattern.renderText && typeof matchedPattern.renderText === 'function') {
    children = matchedPattern.renderText(text, matches);
  }

  return {
    ...props,
    children,
    matched: true
  };
}

export function textExtraction(text: string, patterns: ParseType[]): MatchPartType[] {
  let parsedTexts: MatchPartType[] = [{ children: text }];

  patterns.forEach((pattern) => {
    const newParts: MatchPartType[] = [];

    const tmp = pattern.nonExhaustiveModeMaxMatchCount || 0;
    const numberOfMatchesPermitted = Math.min(
      Math.max(Number.isInteger(tmp) ? tmp : 0, 0) || Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY
    );

    let currentMatches = 0;

    parsedTexts.forEach((parsedText: MatchPartType) => {
      if (parsedText.matched) {
        newParts.push(parsedText);
        return;
      }

      const parts = [];
      let textLeft = parsedText.children;
      let indexOfMatchedString = 0;

      let matches: RegExpExecArray | null;
      // Global RegExps are stateful, this makes it start at 0 if reused
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
      pattern.pattern.lastIndex = 0;
      while (textLeft && (matches = new RegExp(pattern.pattern, 'i').exec(textLeft))) {
        if (!isInfixText(pattern.type, matches[0], textLeft)) {
          break;
        }
        const previousText = textLeft.substr(0, matches.index);
        indexOfMatchedString = matches.index;

        if (++currentMatches > numberOfMatchesPermitted) {
          // Abort if we've exhausted our number of matches
          break;
        }

        parts.push({ children: previousText });
        parts.push(getMatchedPart(pattern, matches[0], matches, indexOfMatchedString));

        textLeft = textLeft.substr(matches.index + matches[0].length);
        indexOfMatchedString += matches[0].length - 1;
        // Global RegExps are stateful, this makes it operate on the "remainder" of the string
        pattern.pattern.lastIndex = 0;
      }

      parts.push({ children: textLeft });
      newParts.push(...parts);
    });

    parsedTexts = newParts;
  });

  // Remove matched key.
  parsedTexts.forEach((parsedText) => delete parsedText.matched);
  return parsedTexts.filter((t) => !!t.children);
}

export function removePrefixOrPostfixText(type: PatternsEnum | undefined, text: string): string {
  switch (type) {
    case PatternsEnum.boldWith2Star:
      return `${text.substring(2, text.length - 2)} `;
    case PatternsEnum.boldWith2Underscore:
      return `${text.substring(2, text.length - 2)} `;
    case PatternsEnum.italicWith1Star:
      return `${text.substring(1, text.length - 1)} `;
    case PatternsEnum.italicWith1Underscore:
      return `${text.substring(1, text.length - 1)} `;
    case PatternsEnum.strikethrough:
      return `${text.substring(2, text.length - 2)} `;
    case PatternsEnum.underline:
      return `${text.substring(1, text.length - 1)} `;

    case PatternsEnum.blockquote:
      return `${text.substring(2, text.length)} `;
    case PatternsEnum.newLine:
      return '\n';
    case PatternsEnum.lineBreak:
      return '\n';

    default:
      return text;
  }
}

function callNumber(phone: string): void {
  let phoneNumber: string = phone;
  if (isIos) {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported: boolean) => {
      if (supported) {
        Linking.openURL(phoneNumber);
      }
    })
    .catch((err: Error) => sentryCaptureException(err));
}

function callEmail(email: string): void {
  const eMail: string = `mailto:${email}`;
  Linking.canOpenURL(eMail)
    .then((supported: boolean) => {
      if (supported) {
        Linking.openURL(eMail);
      }
    })
    .catch((err: Error) => sentryCaptureException(err));
}

function callUrl(url: string): void {
  const urls: string = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
  Linking.canOpenURL(urls)
    .then((supported: boolean) => {
      if (supported) {
        Linking.openURL(urls);
      }
    })
    .catch((err: Error) => sentryCaptureException(err));
}

export function callActions(value: string, type: PatternsEnum): void {
  switch (type) {
    case PatternsEnum.url:
      callUrl(value);
      break;

    case PatternsEnum.email:
      callEmail(value);
      break;

    case PatternsEnum.phone:
      callNumber(value);
      break;

    default:
      if (isEmailFields(value)) {
        callEmail(value);
      } else if (isPhoneFields(value)) {
        callNumber(value);
      } else {
        callUrl(value);
      }
      break;
  }
}
