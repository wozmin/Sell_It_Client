import { Component } from '@angular/core';
import 'hammerjs';
import {SpinnerService} from './core/services/ui/spinner.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from './core/services/language.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SellItClient';

  constructor(public spinnerService: SpinnerService, private _translateService: TranslateService, private _languageService: LanguageService) {
    _translateService.setDefaultLang('uk');
    _translateService.addLangs(environment.supportedLanguages);
    let lang = localStorage.getItem('lang');
    let systemLang = environment.supportedLanguages.includes(lang)? lang : _translateService.getBrowserLang();
    _translateService.use(systemLang);
    this._languageService.onLanguageChange.subscribe((lang: string) => {
      _translateService.use(lang);
    });
  }

}
