import {IUser} from '../auth-http/user.interface';
import {ICategory} from '../category-http/category';

export interface IPost {
  id: string;
  user: IUser;
  moderation: boolean;
  title: string;
  data: IPostData;
  likes: string[];
  category: ICategory;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostCreateDto {
  data: IPostData;
  title: string;
  userId: string;
  category: string;
}

export interface IPostsFilters {
  moderation?: boolean;
  userId?: string;
  categoryId?: string;
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
