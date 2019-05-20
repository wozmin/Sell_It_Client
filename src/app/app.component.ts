import { Component } from '@angular/core';
import 'hammerjs';
import {SpinnerService} from './core/services/ui/spinner.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SellItClient';

  constructor(public spinnerService: SpinnerService, private _translateService: TranslateService, private _languageService: LanguageService) {
    _translateService.setDefaultLang('uk');
    _translateService.use('uk');
    this._languageService.onLanguageChange.subscribe((lang: string) => {
      _translateService.use(lang);
    });
  }

}
