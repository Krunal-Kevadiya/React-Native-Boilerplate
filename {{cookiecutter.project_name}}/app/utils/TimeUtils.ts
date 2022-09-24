import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { isPresentValue } from '@utils';

/**
 * Takes in a number and returns a string of the number with the correct number of zeros.
 * @param {number} num - the number to pad with zeros
 * @param {boolean} [allowSlice=true] - whether or not to allow slicing of the number
 * @returns {string} - the padded number
 */
function pad(num: number, allowSlice: boolean = true): string {
  const numbers = num >= 10 ? `${num}` : `0${num}`;
  return allowSlice ? numbers.slice(-2) : numbers;
}

/**
 * Takes in a number of seconds and returns a string of the form MM:SS.
 * @param {number} secs - the number of seconds to convert to a string.
 * @returns {string} - the string representation of the number of seconds.
 */
export function secondsTomsByTranscript(secs: number): string {
  let minutes = Math.floor(secs / 60);
  secs = Math.floor(secs % 60);
  minutes = Math.floor(minutes % 60);
  return pad(minutes) + ':' + pad(secs);
}

/**
 * Takes in a number of seconds and returns a string of the form MM:SS.
 * @param {number} secs - the number of seconds to convert to a string.
 * @returns {string} - the string representation of the number of seconds.
 */
export function secondsToms(secs: number): string {
  let minutes = Math.floor(secs / 60);
  secs = Math.floor(secs % 60);
  minutes = Math.floor(minutes % 60);
  return pad(minutes) + ':' + pad(secs);
}

/**
 * Takes in a number of seconds and returns a string of the number of minutes and seconds
 * in the format MM:SS.
 * @param {number} secs - the number of seconds to convert to a string
 * @returns {string} - the number of minutes and seconds in the format MM:SS.
 */
export function secondsToHms(secs: number): string {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs - minutes * 60);
  return minutes === 0 ? pad(seconds) : pad(minutes, false) + ':' + pad(seconds);
}

/**
 * Takes in a number of milliseconds and returns a string of the form MM:SS.
 * @param {number} milliseconds - the number of milliseconds to convert to a string
 * @returns {string} the string representation of the number of milliseconds
 */
export function millisecondsToms(milliseconds: number): string {
  let secs = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(secs / 60);
  secs = Math.floor(secs % 60);
  minutes = Math.floor(minutes % 60);
  return pad(minutes) + ':' + pad(secs);
}

/**
 * Convert milliseconds to seconds.
 * @param {number} milliseconds - The number of milliseconds to convert to seconds.
 * @returns A function that takes a number and returns a number.
 */
export function millisecondsToSeconds(milliseconds: number): number {
  const secs = Math.floor(milliseconds / 1000);
  return secs;
}

/**
 * Converts a string of the form "MM:SS" to a number of seconds.
 * @param {string} ms - the string to convert.
 * @returns {number} the number of seconds.
 */
export function msToSeconds(ms: string): number {
  if (isPresentValue(ms)) {
    const time = ms.split(':');
    return parseInt(time[0], 10) * 60 + parseInt(time[1], 10);
  } else {
    return 0;
  }
}

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
});

/**
 * Takes in a date and returns the time since that date.
 * @param {string} date - the date to get the time since
 * @param {string} inputFormat - the format of the date
 * @param {boolean} [isDateVisible=false] - whether or not to display the date
 * @returns {string} the time since the date
 */
export function timeSince(date: string, inputFormat: string, isDateVisible: boolean = false): string {
  const newDate = dayjs(dayjs(date, inputFormat)?.toDate());
  let temp = dayjs(newDate).fromNow();
  const diff = dayjs().diff(dayjs(newDate), 'days', true);
  if (diff >= 1) {
    return isDateVisible ? dayjs(newDate).format('MMM DD h:mm A') : diff === 1 ? '1 day ago' : temp;
  } else if (diff >= 0.916 && diff <= 1) {
    const hours = dayjs().diff(dayjs(newDate), 'hours');
    return `${hours}h ago`;
  }
  if (temp.includes('now')) {
    temp = temp?.replace('now ago', '1s ago');
  }
  return temp;
}
