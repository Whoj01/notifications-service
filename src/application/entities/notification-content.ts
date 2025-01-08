export class Content {
  content: string;

  constructor(content: string) {
    const isContentLengthValid = this.#validateContentLength(content);

    if (!isContentLengthValid) {
      throw new Error('Invalid content length');
    }

    this.content = content;
  }

  get value(): string {
    return this.content;
  }

  #validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
