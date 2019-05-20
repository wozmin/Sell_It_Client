import { Component } from '@angular/core';
import 'hammerjs';
import {SpinnerService} from './core/services/ui/spinner.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SellItClient';

  constructor(public spinnerService: SpinnerService, private _translateService:TranslateService) {
    _translateService.setDefaultLang('ua');
    _translateService.use('ua');
  }

}
