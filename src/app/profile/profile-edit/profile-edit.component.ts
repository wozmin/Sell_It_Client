import { Component, OnInit } from '@angular/core';
import {Profile} from "../../core/models/profile/profile.model";
import {ProfileService} from "../../core/services/profile.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {Utils} from '../../core/utils';
import {DateFormatPipe} from 'ngx-moment';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  public errors: any;
  public profile:Profile;
  public profileForm:FormGroup;
  constructor
    (
      private _formBuilder:FormBuilder,
      private _profileService:ProfileService,
      private _router: Router,
      private _dateFormate: DateFormatPipe,
      private _activatedRoute: ActivatedRoute
    ) {

      }

  ngOnInit() {
    this._activatedRoute.params.pipe(map(params => params['id'])).subscribe((id: number) => {
      this._profileService.getById(id).subscribe((profile: Profile) => {
        this.profile = profile;
        this.profileForm = this._formBuilder.group({
          username: [this.profile.username, Validators.required],
          firstName: [this.profile.firstName, Validators.required],
          lastName: [this.profile.lastName, Validators.required],
          birthDate: [this.profile.birthDate, Validators.required],
          phone: [this.profile.phone, [Validators.required, Validators.pattern('^\\+?3?8?(0\\d{9})$')]]
        });
      });
    });
  }

  public save(profile:Profile):void{
    if(!this.profileForm.invalid){
      profile.birthDate =  this._dateFormate.transform(profile.birthDate,'YYYY-MM-DD');
      this._profileService.update(profile).subscribe((profile: Profile) => {
          this._profileService.onProfileUpdate.next(profile);
        this._router.navigateByUrl('/profile');
        },
        error => {
          this.errors = Utils.toCamelCase(error.error);
          Object.keys(this.errors).map(key => {
            this.profileForm.controls[key].setErrors({invalid: true});
          });
        })
    }
  }

}
