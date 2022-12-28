export interface IPost {
  id: string;
  userId: string;
  moderation: boolean;
  title: string;
  data: any;
  likes: number;
}
