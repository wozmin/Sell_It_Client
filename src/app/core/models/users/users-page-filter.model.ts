import {User} from './user.model';

export interface UsersPageFilter {
  count: number;
  next: boolean;
  previous: boolean;
  results: User[];
}
