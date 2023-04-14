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

export const editorjsConfig = {
  holder: 'editorjs',
  tools: {
    header: Header,
    list: List,
    embed: Embed,
    Marker: Marker,
    image: ImageTool,
  },
  readOnly: true,
};
