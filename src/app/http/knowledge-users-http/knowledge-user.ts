import {IUser} from '../auth-http/user.interface';
import {ICategory} from '../category-http/category';

export interface IKnowledgeUser {
  id: string;
  mainAdmin: boolean;
  categoriesAdmin: ICategory[];
  user: IUser;
}
