import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fuseAnimations } from 'src/animations';
import {AuthService} from '../../core/services/auth.service';

@Component({
    selector   : 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls  : ['./forgot-password.component.scss'],
    animations : fuseAnimations
})
export class ForgotPasswordComponent implements OnInit
{
    forgotPasswordForm: FormGroup;
    constructor(
        private _formBuilder: FormBuilder,
        private _authService:AuthService
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
      this._authService.resetPassword(this.forgotPasswordForm.controls.email.value).subscribe(console.log);
    }
}
