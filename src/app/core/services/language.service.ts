import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public onLanguageChange: Subject<string> = new Subject<string>();
}
