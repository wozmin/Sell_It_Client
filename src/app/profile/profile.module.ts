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



@NgModule({
    declarations: [
        ProfileComponent,
        ProfileAboutComponent,
        ProfileEditComponent,
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
        SharedModule
    ]
})
export class ProfileModule
{
}
