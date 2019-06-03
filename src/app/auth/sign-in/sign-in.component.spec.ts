import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SignInComponent} from "./sign-in.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from '../../core/services/auth.service';
import {SignInModel} from '../../core/models/auth/sign-in.model';
import {TranslateModule,  TranslateStore} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {of, throwError} from 'rxjs';


class NotifierServiceStab{
  public notify(type:string,message:string):void{

  }
}

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService:AuthService;
  let notifierService:NotifierService;
  let router:Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      providers:[
        AuthService,
        {provide:NotifierService, useClass:NotifierServiceStab},
        TranslateStore
      ],
      imports:[ReactiveFormsModule,SharedModule,RouterTestingModule,HttpClientTestingModule,NoopAnimationsModule,TranslateModule.forChild()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    notifierService = TestBed.get(NotifierService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should signIn successfully',fakeAsync(()=>{
     let credsMock:SignInModel = {
       username:"username",
       password:"password"
     };
      spyOn(authService,'signIn').and.returnValue(of({token:"token",refresh:"refresh"}));
      spyOn(router,'navigateByUrl').and.callThrough();
      spyOn(authService,'saveTokens').and.callThrough();
      component.signIn(credsMock);
      tick();
      expect(authService.signIn).toHaveBeenCalledWith(credsMock);
      expect(router.navigateByUrl).toHaveBeenCalledWith('');
      expect(authService.saveTokens).toHaveBeenCalled();
  }));

  it('should fail signIn',fakeAsync(()=>{
    let credsMock:SignInModel = {
      username:"username",
      password:"password"
    };
    spyOn(authService,'signIn').and.returnValue(
      throwError({error:{non_field_errors:"someError"}})
    );
    spyOn(notifierService,'notify');
    component.signIn(credsMock);
    tick();
    expect(authService.signIn).toHaveBeenCalledWith(credsMock);
    expect(notifierService.notify).toHaveBeenCalledWith('error','someError');
  }))
});
