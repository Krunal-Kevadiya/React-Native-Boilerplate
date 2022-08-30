import { isPresentValue } from './StringUtil';

export function getFileExtension(url?: string | null, defaultExt: string = ''): string {
  if (!isPresentValue(url)) {
    return defaultExt;
  } else {
    const localUrl = url ?? '';
    let index = localUrl.lastIndexOf('/');
    if (index !== -1) {
      url = localUrl.substring(index + 1); // Keep path without its segments
    }
    index = localUrl.indexOf('?');
    if (index !== -1) {
      url = localUrl.substring(0, index); // Remove query
    }
    index = localUrl.indexOf('#');
    if (index !== -1) {
      url = localUrl.substring(0, index); // Remove fragment
    }
    index = localUrl.lastIndexOf('.');
    return index !== -1
      ? localUrl.substring(index + 1) // Only keep file extension
      : defaultExt; // No extension found
  }
}
