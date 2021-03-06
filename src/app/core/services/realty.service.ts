import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Realty} from "../models/realty/realty.model";
import {RealtyDetails} from "../models/realty/realty-details.model";
import {RealtyFilter} from '../models/realty/realty-filter.model';
import {map} from 'rxjs/operators';
import {Utils} from '../utils';
import {RealtyPageFilter} from '../models/realty/realty-page-filter.model';
import {AttachedImage} from '../models/realty/attached-image.model';

@Injectable({
  providedIn:"root"
})
export class RealtyService {
  private readonly _url:string;

  constructor(private _http:HttpClient){
    this._url = environment.apiUrl;
  }

  public getAllByFilter(realtyFilter: RealtyFilter, page: number): Observable<RealtyPageFilter> {
    return this._http.get<RealtyPageFilter>(this._url +
      `realty/default/?price__lt=${realtyFilter.price || ''}&rooms=${realtyFilter.rooms || ''}&page=${page}&page_size=10&
       ordering=${realtyFilter.sortingOrder || ''}&floor__gte=${realtyFilter.floor || ''}&floor__lte=${realtyFilter.floor || ''}&kind=${realtyFilter.resourcetype || ''}`)
      .pipe(
        map(json => Utils.toCamelCase(json))
      );
  }

  public getFavoriteRealty(realtyFilter: RealtyFilter, page: number):Observable<RealtyPageFilter>{
    return this._http.get<RealtyPageFilter>(this._url +
      `realty/likes/?price__lt=${realtyFilter.price || ''}&rooms=${realtyFilter.rooms || ''}&page=${page}&page_size=10&
        ordering=${realtyFilter.sortingOrder || ''}&floor__gte=${realtyFilter.floor || ''}&floor__lte=${realtyFilter.floor || ''}&kind=${realtyFilter.resourcetype || ''}`
    )
      .pipe(
        map(json => Utils.toCamelCase(json))
      );
  }

  public getUsersRealty(profileId: number, page: number): Observable<RealtyPageFilter> {
    return this._http.get<RealtyPageFilter>(this._url + `realty/users/${profileId}?page=${page}&page_size=10`)
      .pipe(
        map(json => Utils.toCamelCase(json))
      );
  }

  public getById(id:number):Observable<RealtyDetails>{
    return this._http.get<RealtyDetails>(this._url+`realty/default/${id}`)
      .pipe(map(json => Utils.toCamelCase(json)));
  }

  public update(realty: RealtyDetails): Observable<RealtyDetails> {
    let realtyPhotoIds = [];
    realty.photos.map(photo=> realtyPhotoIds.push({id:photo.id}));
    return this._http.put<RealtyDetails>(this._url + `realty/default/${realty.id}/`, Utils.toSnakeCase({...realty, photos:realtyPhotoIds}))
      .pipe(map(json => Utils.toCamelCase(json)));
  }

  public add(realty: RealtyDetails): Observable<RealtyDetails> {
    let realtyPhotoIds = [];
    realty.photos.map(photo => realtyPhotoIds.push({id: photo.id}));
    return this._http.post<RealtyDetails>(this._url + 'realty/default/', Utils.toSnakeCase({...realty, photos: realtyPhotoIds}))
      .pipe(map(json => Utils.toCamelCase(json)));
  }

  public uploadPhoto(photo:AttachedImage):Observable<AttachedImage>{
    let formData = new FormData();
    formData.append("photo",photo.blob);
    return this._http.post<AttachedImage>(this._url + 'realty/photos/',formData);
  }

  public deleteImage(imageId:number):Observable<any>{
    return this._http.delete<any>(this._url + 'realty/photos/'+imageId);
  }

  public addToFavorite(realtyId:number):Observable<object>{
    return this._http.patch(this._url + `realty/likes/${realtyId}/`,{});
  }

  public removeFromFavorite(realtyId:number):Observable<object>{
    return this._http.delete(this._url + `realty/likes/${realtyId}/`);
  }

  public getRealtyShareKey(realtyId: number): Observable<string> {
    return this._http.post<any>(this._url + 'realty/share/', {realty: realtyId}).pipe(map(res => res.uuid));
  }

  public getRealtyDetailsBySharedKey(sharedKey: string): Observable<RealtyDetails> {
    return this._http.get<RealtyDetails>(this._url + `realty/share/${sharedKey}/`);
  }
}
