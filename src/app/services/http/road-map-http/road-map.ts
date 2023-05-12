import {IUser} from '../auth-http/user.interface';

export interface IRoadMap {
  id: string;
  name: string;
  shortDescription: string;
  author: IUser;
  subscribes: IUser[];
}

export interface ICreateRoadMapDto {
  name: string;
  author: string;
  shortDescription: string;
}
