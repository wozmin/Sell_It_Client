import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {confirmPasswordValidator} from '../sign-up/sign-up.component';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.scss']
})
export class ConfirmResetPasswordComponent implements OnInit {

  public token: string;
  public errors: any;
  public confirmResetPasswordForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.pipe(map(params => params['token'])).subscribe((token: string) => {
      this.token = token;
    });
    this.confirmResetPasswordForm = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
    });
  }

  public confirmResetPassword(): void {
    this._authService.confirmResetPassword({
      password: this.confirmResetPasswordForm.controls.password.value,
      token: this.token
    }).subscribe(() => {
        this._router.navigateByUrl('/sign-in');
      },
      error => {
        this.errors = error.error;
        Object.keys(error.error).map(key => {
          this.confirmResetPasswordForm.controls[key].setErrors({invalid: true});
        });
      });
  }

}
