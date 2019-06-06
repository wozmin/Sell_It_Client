import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";
import {NotFoundComponent} from "./static/not-found/not-found.component";
import {ConfirmResetPasswordComponent} from './auth/confirm-reset-password/confirm-reset-password.component';

const routes: Routes = [
  {
    path:'sign-in',
    component:SignInComponent
  },
  {
    path:'sign-up',
    component:SignUpComponent
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path: 'confirm-password',
    component: ConfirmResetPasswordComponent
  },
  {
    path:'',
    loadChildren: './layout/layout.module#LayoutModule'
  },
  {
    path:'not-found',
    component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
