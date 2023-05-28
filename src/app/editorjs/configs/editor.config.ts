// @ts-ignore
import CodeTool from '@editorjs/code';
// @ts-ignore
// @ts-ignore
import { I18nDictionary } from '@editorjs/editorjs';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import ImageTool from '@editorjs/image';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Marker from '@editorjs/marker';
// @ts-ignore
import Table from '@editorjs/table'

import IframeSceneTool from '../plugins/iframe-scene';

export const editorjsConfig = {
  holder: 'editorjs',

  tools: {
    header: Header,
    list: List,
    embed: Embed,
    Marker: Marker,
    code: CodeTool,
    scene: IframeSceneTool,
    table: Table,
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: 'api/image/upload', // Your backend file uploader endpoint
        },
      },
    },
  },
  i18n: {
    /**
     * @type {I18nDictionary}
     */
    messages: {
      toolNames: {
        "Text": "Текст",
        "Heading": "Заголовок",
        "List": "Список",
        "Code": "Код",
        "Table": "Таблица",
        "Image": "Изображение",
      },
    }
  },

  placeholder: 'Нажмите Tab для выбора инструмента',
};
