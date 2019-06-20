import {Component, Input, OnDestroy, OnInit} from '@angular/core';


import { fuseAnimations } from 'src/animations';
import {Profile} from '../../../core/models/profile/profile.model';
import {ProfileService} from '../../../core/services/profile.service';
import {RealtyService} from '../../../core/services/realty.service';
import {Realty} from '../../../core/models/realty/realty.model';
import {RealtyPageFilter} from '../../../core/models/realty/realty-page-filter.model';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
    selector   : 'profile-about',
    templateUrl: './about.component.html',
    styleUrls  : ['./about.component.scss'],
    animations : fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy {
  public profile: Profile;
  public realty: Realty[];
  public page: number = 1;
  public isCurrentUserProfile:boolean = false;
    constructor(
      private _profileService: ProfileService,
      private _realtyService: RealtyService,
      private _activatedRouter: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
      this._activatedRouter.params.pipe(map(params => params['id'])).subscribe((id: number) => {
        this._profileService.getById(id).subscribe((profile: Profile) => {
          this.profile = profile;
          this._profileService.getCurrentUserProfileInfo().subscribe((currentProfile:Profile)=>{
            this.isCurrentUserProfile = id == currentProfile.id;
          });
          this._realtyService.getUsersRealty(this.profile.id, this.page).subscribe((realtyPageFilter: RealtyPageFilter) => {
            this.realty = realtyPageFilter.results;
          });
        });
      });
    }

  public loadMore(): void {
    this.page++;
  }

    ngOnDestroy(): void {

    }
}
