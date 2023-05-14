import {IUser} from '../auth-http/user.interface';
import {IPost} from '../post-http/post.interface';
import {IRoadMap} from '../road-map-http/road-map';

export interface IRoadMapNode {
  id: string;
  title: string;
  links: string;
  data: Record<string, any>;
  articles: IPost[];
  roadMap: IRoadMap;
  next: string[];
  root: boolean;
  mark: IUser[];
}

export interface IRoadMapNodeFilter {
  roadMap?: string;
}

export interface ICreateRoadMapNodeDto {
  title: string;
  roadMap: string;
  root: boolean;
  parent: string | null;
  next?: string[];
  links?: string[];
  articles?: string[];
  data?: Record<string, any>;
  mark?: string[];
}
