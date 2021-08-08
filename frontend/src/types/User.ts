import { Id } from './Id';
import { Token } from './Token';

export interface User {
  id: Id;
  name: string;
  admin: boolean;
}

export interface UserWithToken extends User {
  token: Token;
}
