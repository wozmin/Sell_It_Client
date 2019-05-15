import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, finalize, switchMap, takeUntil, timeout} from 'rxjs/internal/operators';

import {fuseAnimations} from 'src/animations';
import {SignUpModel} from '../../core/models/auth/sign-up.model';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/internal/operators/tap';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'register',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: fuseAnimations
})
export class SignUpComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  errors: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _spinner: NgxSpinnerService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?3?8?(0\\d{9})$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes
    //this.validateUsername();
    this.registerForm.get('password').valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('passwordConfirm').updateValueAndValidity();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  public signUp(credentials: SignUpModel): void {
    this._authService.signUp(credentials).pipe(
      tap(() => this._spinner.show()),
      timeout(2000),
      finalize(() => this._spinner.hide())
    ).subscribe(
      () => {
        this._router.navigateByUrl('sign-in');
      },
      error => {
        this.errors = error.error;
        Object.keys(error.error).map(key => {
          this.registerForm.controls[key].setErrors({invalid: true});
        });
      });
  }

  public validateUsername(): void {
    this.registerForm.controls['username'].valueChanges
      .pipe(
        debounceTime(900),
        switchMap((username: string) => this._authService.isUsernameUnique(username))
      )
      .subscribe((res: boolean) => {
        if (res) {
          this.registerForm.controls['username'].setErrors({unique: true});
        }
      });
  }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return {'passwordsNotMatching': true};
};
