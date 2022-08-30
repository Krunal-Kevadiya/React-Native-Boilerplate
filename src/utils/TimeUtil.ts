import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { isPresentValue } from '@utils';

function pad(num: number, allowSlice: boolean = true): string {
  const numbers = num >= 10 ? `${num}` : `0${num}`;
  return allowSlice ? numbers.slice(-2) : numbers;
}

export function secondsTomsByTranscript(secs: number): string {
  let minutes = Math.floor(secs / 60);
  secs = Math.floor(secs % 60);
  minutes = Math.floor(minutes % 60);
  return pad(minutes) + ':' + pad(secs);
}

export function secondsToms(secs: number): string {
  let minutes = Math.floor(secs / 60);
  secs = Math.floor(secs % 60);
  minutes = Math.floor(minutes % 60);
  return pad(minutes) + ':' + pad(secs);
}

export function secondsTohms(secs: number): string {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs - minutes * 60);
  return minutes === 0 ? pad(seconds) : pad(minutes, false) + ':' + pad(seconds);
}

export function millisecondsToms(milliseconds: number): string {
  let secs = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(secs / 60);
  secs = Math.floor(secs % 60);
  minutes = Math.floor(minutes % 60);
  return pad(minutes) + ':' + pad(secs);
}

export function millisecondsToSeconds(milisecs: number): number {
  const secs = Math.floor(milisecs / 1000);
  return secs;
}

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
