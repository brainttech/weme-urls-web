export interface ISignupEntity {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: UserRoles;
  avatar: File;
  cep: string;
  street: string;
  number: string;
  district: string;
  complement: string;
  city: string;
  state: string;
}

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}
