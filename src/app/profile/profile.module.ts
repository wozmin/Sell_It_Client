import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule, MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';
import {SharedModule} from "../shared/shared.module";
import {ProfileAboutComponent} from "./tabs/about/about.component";
import {ProfileComponent} from "./profile.component";
import {ProfileEditComponent} from "./profile-edit/profile-edit.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {TranslateModule} from '@ngx-translate/core';
import {ImageCropperModule} from 'ngx-image-cropper';
import { ImageCropperModalComponent } from './image-cropper-modal/image-cropper-modal.component';
import {DateFormatPipe, MomentModule} from 'ngx-moment';



@NgModule({
    declarations: [
        ProfileComponent,
        ProfileAboutComponent,
        ProfileEditComponent,
        ImageCropperModalComponent,
    ],
    imports: [
        ProfileRoutingModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        SharedModule,
        TranslateModule.forChild(),
      ImageCropperModule,
      MomentModule
    ],
  providers: [DateFormatPipe],
    entryComponents:[
      ImageCropperModalComponent
    ]
})
export class ProfileModule
{
}
