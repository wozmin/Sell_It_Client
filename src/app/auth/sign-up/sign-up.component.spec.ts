import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from '../../core/services/auth.service';
import {TranslateModule,  TranslateStore} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {of, throwError} from 'rxjs';
import {SignUpComponent} from './sign-up.component';
import {SignUpModel} from '../../core/models/auth/sign-up.model';


class NotifierServiceStab{
  public notify(type:string,message:string):void{

  }
}

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService:AuthService;
  let notifierService:NotifierService;
  let router:Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      providers:[
        AuthService,
        TranslateStore,
        {provide:NotifierService, useClass:NotifierServiceStab}
      ],
      imports:[ReactiveFormsModule,SharedModule,RouterTestingModule,HttpClientTestingModule,NoopAnimationsModule,TranslateModule.forChild()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    notifierService = TestBed.get(NotifierService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should signUp successfully',fakeAsync(()=>{
    let credsMock:SignUpModel = {
      username:"username",
      password:"password",
      email:"email",
      phone:"phone"
    };
    spyOn(authService,'signUp').and.returnValue(of({token:"token",refresh:"refresh"}));
    spyOn(router,'navigateByUrl')
    component.signUp(credsMock);
    tick();
    expect(authService.signUp).toHaveBeenCalledWith(credsMock);
    expect(router.navigateByUrl).toHaveBeenCalledWith('sign-in');
  }));

  it('should fail signUp',fakeAsync(()=>{
    let credsMock:SignUpModel = {
      username:"username",
      password:"password",
      email:"email",
      phone:"phone"
    };
    let errorObj = {
      error:{
        email:"wrongEmail"
      }
    };
    spyOn(authService,'signUp').and.returnValue(
      throwError(errorObj)
    );
    spyOn(notifierService,'notify');
    component.signUp(credsMock);
    tick();
    expect(authService.signUp).toHaveBeenCalledWith(credsMock);
    expect(component.errors).toBe(errorObj.error);
  }));

  it('should update confirm password value and validity ',()=>{
    let formControls = component.registerForm.controls;
    spyOn(formControls.passwordConfirm,'updateValueAndValidity');
    formControls.password.setValue(123);
    fixture.detectChanges();
    expect(formControls.passwordConfirm.updateValueAndValidity).toHaveBeenCalled();
  })
});
