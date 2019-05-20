import {NgModule} from "@angular/core";
import {SignInComponent} from "./sign-in/sign-in.component";
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule} from '@angular/material';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {SharedModule} from "../shared/shared.module";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/auth/', '.json');
}

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ],
  imports     : [
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  exports:[
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ]
})
export class AuthModule{

}
