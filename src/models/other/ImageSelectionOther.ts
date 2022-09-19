/**
 * A class that represents an image selection other than the default selection.
 * @param {string | null} source - The source of the image.
 * @param {string | null} fileName - The name of the file.
 * @param {string | null} data - The data of the image.
 */
export class ImageSelectionOther {
  readonly source?: string | null;
  readonly fileName?: string | null;
  readonly data?: string | null;

  /**
   * A constructor for the image selection other class.
   * @param {string | null} source - The source code of the page.
   * @param {string | null} fileName - The name of the file that the code is from.
   * @param {string | null} data - The data that the code is from.
   */
  constructor(source?: string | null, fileName?: string | null, data?: string | null) {
    this.source = source;
    this.fileName = fileName;
    this.data = data;
  }

  /**
   * Creates an empty ImageSelectionOther object.
   * @param {string | null} source - the source of the image.
   * @param {string | null} fileName - the name of the file.
   * @param {string | null} data - the data of the image.
   * @returns {ImageSelectionOther} - an empty ImageSelectionOther object.
   */
  static empty(
    source: string | null = null,
    fileName: string | null = null,
    data: string | null = null
  ): ImageSelectionOther {
    return new ImageSelectionOther(source, fileName, data);
  }
}
