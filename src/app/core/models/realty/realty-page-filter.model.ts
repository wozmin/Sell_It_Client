import {Realty} from './realty.model';

export interface RealtyPageFilter {
  count: number;
  next: boolean;
  previous: boolean;
  results: Realty[];
}
