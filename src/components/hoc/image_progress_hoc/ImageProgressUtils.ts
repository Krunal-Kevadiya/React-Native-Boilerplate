/**
 * It returns the `uri` property of the `source` object if it exists, otherwise it returns the string
 * representation of the `source` object
 * @param {any} source - The source of the image. This can be either an object with a uri property, or
 * a string representing the URI.
 * @returns The source key is being returned.
 */
export function getSourceKey(source: any): string {
  return (source && source.uri) || String(source);
}
