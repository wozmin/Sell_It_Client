import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {UsersPageFilter} from '../models/users/users-page-filter.model';
import {map} from 'rxjs/operators';
import {Utils} from '../utils';
import {UserFilter} from '../models/users/user-filter.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly _url: string;

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl;
  }

  public getByFilter(filter: UserFilter): Observable<UsersPageFilter> {
    return this._http.get<UsersPageFilter>(this._url + `users/list/?page=${filter.page}&page_size=10&search=${filter.search || ''}`)
      .pipe(
        map(json => Utils.toCamelCase(json))
      );
  }
}
