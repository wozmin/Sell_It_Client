import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fuseAnimations } from 'src/animations';
import {AuthService} from '../../core/services/auth.service';
import {NotifierService} from 'angular-notifier';

@Component({
    selector   : 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls  : ['./forgot-password.component.scss'],
    animations : fuseAnimations
})
export class ForgotPasswordComponent implements OnInit
{
  public errors: any;
  public forgotPasswordForm: FormGroup;
    constructor(
      private _formBuilder: FormBuilder,
      private _authService: AuthService,
      private  _notifierService: NotifierService
    )
    {

    }

    ngOnInit(): void
    {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    public resetPassword():void{
      this._authService.resetPassword(this.forgotPasswordForm.controls.email.value)
        .subscribe(() => {
            this._notifierService.notify('success', 'The reset email have been sent');
          },
          error => {
            this.errors = error.error;
            Object.keys(error.error).map(key => {
              this.forgotPasswordForm.controls[key].setErrors({invalid: true});
            });
          });
    }
}
