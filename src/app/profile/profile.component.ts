import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import { fuseAnimations } from 'src/animations';
import {ProfileService} from "../core/services/profile.service";
import {Profile} from "../core/models/profile/profile.model";
import {SpinnerService} from '../core/services/ui/spinner.service';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent implements OnInit
{
  public showSpinner: boolean = false;
    public profile:Profile;

  constructor(private _profileService: ProfileService, private _spinnerService: SpinnerService)
    {

    }

  ngOnInit(): void {
    this._spinnerService.isLoading.next(true);
      this._profileService.getCurrentUserProfileInfo().subscribe((profile:Profile)=>{
        this._spinnerService.isLoading.next(false);
          this.profile = profile;
      });
  }

  public onAvatarChange(imageInput:any){
    const file: File = imageInput.files[0];
    this.showSpinner = true;
    this._profileService.changeAvatar(file).subscribe((url:string)=>{
      this.profile.image = url;
      this.showSpinner = false;
    })

  }



}
