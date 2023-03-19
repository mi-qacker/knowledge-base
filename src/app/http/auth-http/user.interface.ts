export interface ILoginUserDto {
  login: string;
  password: string;
}

export interface IRegisterUserDto {
  login: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUser {
  _id: string;
  lastName: string;
  firstName: string;
  email: string;
  login: string;
  avatar: string | null;
}
