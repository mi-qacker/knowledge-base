export interface IPost {
  id: string;
  userId: string;
  moderation: boolean;
  title: string;
  data: IPostData;
  likes: string[];
}

export interface IPostData {
  time: number;
  blocks: (IHeaderBlock | IParagraphBlock)[];
  version: string;
}

export interface IHeaderBlock {
  id: string;
  type: 'header';
  data: {
    text: string;
    level: number;
  };
}

export interface IParagraphBlock {
  id: string;
  type: 'paragraph';
  data: {
    text: string;
  };
}
