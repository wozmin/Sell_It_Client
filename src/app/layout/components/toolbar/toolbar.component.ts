import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {Profile} from "../../../core/models/profile/profile.model";
import {ProfileService} from "../../../core/services/profile.service";
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../core/services/language.service';



@Component({
    selector   : 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    selectedLanguage: any;
  profile: Profile;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
      private _authService:AuthService,
      private _profileService:ProfileService,
      private _router: Router,
      private _translateService: TranslateService,
      private _languageService: LanguageService
    )
    {
        this.languages = [
            {
              id: 'uk',
                title: 'English',
              flag: 'uk'
            },
            {
              id: 'ua',
              title: 'Ukrainian',
              flag: 'ua'
            }
          // {
          //     id   : 'fr',
          //     title: 'French',
          //     flag : 'fr'
          // }
        ];
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      this._profileService.getCurrentUserProfileInfo().subscribe((profile: Profile) => {
        this.profile = profile;
      });
      this.selectedLanguage = this.languages.find(lang => lang.id === this._translateService.currentLang);
      this._profileService.onAvatarChange.subscribe((image: string) => {
        this.profile.image = image;
      });
      this._profileService.onProfileUpdate.subscribe((profile: Profile) => {
        this.profile = profile;
      });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    public logout():void{
      this._authService.logout();
      this._router.navigateByUrl('/sign-in');
    }

  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    // this._translateService.use(lang.id);
    this._languageService.onLanguageChange.next(lang.id);
    localStorage.setItem('lang',lang.id);
  }
}
