import { isPresentValue } from './StringUtils';

/**
 * Gets the file extension of the given URL.
 * @param {string | undefined} url - the URL to get the file extension of.
 * @param {string} [defaultExt=''] - the default extension to return if no extension is found.
 * @returns {string} the file extension of the given URL.
 */
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
