import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Realty} from "../models/realty/realty.model";
import {RealtyDetails} from "../models/realty/realty-details.model";
import {RealtyFilter} from '../models/realty/realty-filter.model';

@Injectable({
  providedIn:"root"
})
export class RealtyService {
  private readonly _url:string;

  constructor(private _http:HttpClient){
    this._url = environment.apiUrl;
  }

  public getAllByFilter(realtyFilter:RealtyFilter):Observable<Realty[]>{
    return this._http.get<Realty[]>(this._url+`realty/default/?price__lt=${realtyFilter.price || ''}&rooms=${realtyFilter.rooms || ''}`);
  }

  public getAll():Observable<Realty[]>{
    return this._http.get<Realty[]>(this._url+`realty/default/`);
  }

  public getById(id:number):Observable<RealtyDetails>{
    return this._http.get<RealtyDetails>(this._url+`realty/default/${id}`);
  }
}
