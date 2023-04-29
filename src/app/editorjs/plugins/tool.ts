import EditorJS from '@editorjs/editorjs';

export abstract class Tool<Data, Config = void, Element = HTMLElement> {
  protected data: Data;
  protected api: EditorJS;
  protected config: Config;
  protected readOnly: boolean;

  constructor({data, api, config, readOnly}: IToolConstructor<Data, Config>) {
    this.data = data;
    this.api = api;
    this.config = config;
    this.readOnly = readOnly;
  }

  abstract render(): Element;
  abstract save(element: Element): Data;

  static get isReadOnlySupported() {
    return true;
  }
}

export interface IToolConstructor<Data, Config> {
  data: Data;
  api: EditorJS;
  config: Config;
  readOnly: boolean;
}
