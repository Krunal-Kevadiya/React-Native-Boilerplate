export class ImageSelectionOther {
  readonly source?: string | null;
  readonly fileName?: string | null;
  readonly data?: string | null;

  constructor(source?: string | null, fileName?: string | null, data?: string | null) {
    this.source = source;
    this.fileName = fileName;
    this.data = data;
  }

  static empty(
    source: string | null = null,
    fileName: string | null = null,
    data: string | null = null
  ): ImageSelectionOther {
    return new ImageSelectionOther(source, fileName, data);
  }
}
