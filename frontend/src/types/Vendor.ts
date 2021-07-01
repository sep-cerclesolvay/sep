import { User } from './User';

export type Vendor = Omit<User, 'id' | 'email'>;
