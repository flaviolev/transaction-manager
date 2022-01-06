/* tslint:disable */
/* eslint-disable */
import { User } from './user';
export interface Transaction {
  amount?: number;
  balance: number;
  createdAt?: string;
  id?: number;
  source?: string;
  target?: string;
  user?: User;
}
