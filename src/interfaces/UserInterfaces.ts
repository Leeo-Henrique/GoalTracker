export interface IUserLogin {
  email: string;
  password: string;
}
export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}
export interface IUpdateUser {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

interface IUserContext {
  user: any;
  token: string | undefined;
  loginUser: (data: IUserLogin) => Promise<any>;
  getUser: (token: string) => Promise<any>;
  getUserById: (userId: number) => Promise<any>;
  createUser: (data: ICreateUser) => Promise<string>;
  updateUser: (userId: number, data: IUpdateUser) => Promise<any>;
  deleteUser: (userId: number) => Promise<any>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}
