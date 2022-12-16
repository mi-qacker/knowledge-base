export interface LoginUserDto {
  login: string;
  password: string;
}

export interface User {
  _id: string;
  lastName: string;
  firstName: string;
  email: string;
  login: string;
  avatar: string;
}
