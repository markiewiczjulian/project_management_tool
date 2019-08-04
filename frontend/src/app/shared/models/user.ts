export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  createDate: string;
  isAdmin: boolean;
}

