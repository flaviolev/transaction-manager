/* tslint:disable */
/* eslint-disable */
import { Role } from './role';
export interface User {
  balance: number;
  email: string;
  id?: number;
  password: string;
  roles?: Array<Role>;
  username: string;
}
