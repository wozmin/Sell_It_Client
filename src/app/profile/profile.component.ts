import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import { fuseAnimations } from 'src/animations';
import {ProfileService} from "../core/services/profile.service";
import {Profile} from "../core/models/profile/profile.model";
import {SpinnerService} from '../core/services/ui/spinner.service';
import {MatDialog} from '@angular/material';
import {ImageCropperModalComponent} from './image-cropper-modal/image-cropper-modal.component';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent implements OnInit
{
  @ViewChild('avatar') avatarInput;
  public imageChangedEvent = '';
  public showSpinner: boolean = false;
  public profile:Profile;

  constructor(private _profileService: ProfileService,
              private _spinnerService: SpinnerService,
              private _modalDialog: MatDialog,
              private _activatedRoute: ActivatedRoute)
    {

    }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._spinnerService.isLoading.next(true);
      this._profileService.getById(params['id']).subscribe((profile: Profile) => {
        this._spinnerService.isLoading.next(false);
        this.profile = profile;
      },()=> this._spinnerService.isLoading.next(false));
    });
  }

  public onAvatarChange($event){
    this.openImageCropperModal($event);
  }

  public openImageCropperModal(imageChangeEvent): void {
    const dialogRef = this._modalDialog.open(ImageCropperModalComponent, {
      width: '600px',
      height: '500px',
      maxWidth: '600px',
      maxHeight: '500px',
    });
    dialogRef.componentInstance.imageChangedEvent = imageChangeEvent;
    dialogRef.componentInstance.onChangeImage.subscribe(()=>{
      this.avatarInput.nativeElement.click();
    });
    dialogRef.componentInstance.apply.subscribe((image:File)=>{
      this.showSpinner = true;
      this._profileService.changeAvatar(image).subscribe((url:string)=>{
        this.profile.image = url;
        this._profileService.onAvatarChange.next(url);
        this.showSpinner = false;
      })
    })
  }



}
