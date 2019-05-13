import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Realty} from "../models/realty/realty.model";
import {RealtyDetails} from "../models/realty/realty-details.model";
import {RealtyFilter} from '../models/realty/realty-filter.model';
import {map} from 'rxjs/operators';
import {Utils} from '../utils';

@Injectable({
  providedIn:"root"
})
export class RealtyService {
  private readonly _url:string;

  constructor(private _http:HttpClient){
    this._url = environment.apiUrl;
  }

  public getAllByFilter(realtyFilter:RealtyFilter):Observable<Realty[]>{
    return this._http.get<Realty[]>(this._url+`realty/default/?price__lt=${realtyFilter.price || ''}&rooms=${realtyFilter.rooms || ''}`)
      .pipe(map(json => Utils.toCamelCase(json)));
  }

  public getAll():Observable<Realty[]>{
    return this._http.get<Realty[]>(this._url+`realty/default/`)
      .pipe(map(json => Utils.toCamelCase(json)));
  }

  public getById(id:number):Observable<RealtyDetails>{
    return this._http.get<RealtyDetails>(this._url+`realty/default/${id}`)
      .pipe(map(json => Utils.toCamelCase(json)));
  }

  public update(realty: Realty): Observable<RealtyDetails> {
    return this._http.patch<RealtyDetails>(this._url + `realty/default/${realty.id}/`, realty)
      .pipe(map(json => Utils.toCamelCase(json)));
  }

  public add(realty: Realty): Observable<RealtyDetails> {
    return this._http.patch<RealtyDetails>(this._url + 'realty/default/', realty)
      .pipe(map(json => Utils.toCamelCase(json)));
  }
}
