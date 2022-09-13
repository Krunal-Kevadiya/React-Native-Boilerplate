export function getSourceKey(source: any): string {
  return (source && source.uri) || String(source);
}
