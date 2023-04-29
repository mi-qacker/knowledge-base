// @ts-ignore
import CodeTool from '@editorjs/code';
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

import IframeSceneTool from '../plugins/iframe-scene';

export const editorjsConfig = {
  holder: 'editorjs',
  tools: {
    header: Header,
    list: List,
    embed: Embed,
    code: CodeTool,
    Marker: Marker,
    image: ImageTool,
    scene: IframeSceneTool,
  },
  readOnly: true,
};
