// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Marker from '@editorjs/marker';

export const editorjsConfig = {
  holder: 'editorjs',
  tools: {
    Marker: Marker,
    header: Header,
    list: List,
    embed: Embed,
  },
  placeholder: 'Нажмите Tab для выбора инструмента',
};
