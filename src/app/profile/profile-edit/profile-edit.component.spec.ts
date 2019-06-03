import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { ProfileEditComponent } from './profile-edit.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule, TranslateStore} from '@ngx-translate/core';
import {ProfileService} from '../../core/services/profile.service';
import {Profile} from '../../core/models/profile/profile.model';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of, throwError} from 'rxjs';


describe('ProfileEditComponent', () => {
  let component: ProfileEditComponent;
  let fixture: ComponentFixture<ProfileEditComponent>;
  let profileService:ProfileService;
  let router:Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditComponent ],
      providers:[TranslateStore,ProfileService],
      imports:[SharedModule,RouterTestingModule,HttpClientTestingModule,TranslateModule.forRoot(),RouterTestingModule,BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditComponent);
    component = fixture.componentInstance;
    profileService = TestBed.get(ProfileService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('save',()=>{
    it('should save profile correctly',()=>{
      const profileModelMock:Profile = {
        firstName:"fistName",
        lastName:"lastName",
        gender:"Male",
        image:"image-link",
        username:"userName",
        email:"soeemsa@mail.com",
        birthDate: null,
        phone:"38097831324"
      }, profileFormMock = new FormGroup({});
      spyOn(profileService,'update').and.callFake((profile)=> of({}));
      spyOn(router,'navigateByUrl');
      component.profileForm = profileFormMock;
      component.save(profileModelMock);
      expect(profileService.update).toHaveBeenCalledWith(profileModelMock);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/profile')
    });

    it('should fail save profile',()=>{

      const profileModelMock:Profile = {
        firstName:"fistName",
        lastName:"lastName",
        gender:"Male",
        image:"image-link",
        username:"userName",
        email:"soeemsa@mail.com",
        birthDate: null,
        phone:"38097831324"
      }, profileFormMock = new FormGroup({});
      let errorMock = {
        error:{
          email:'invalid email'
        }
      };
      spyOn(profileService,'update').and.returnValue(throwError(errorMock));
      component.profileForm = profileFormMock;
      component.save(profileModelMock);
      expect(profileService.update).toHaveBeenCalledWith(profileModelMock);
      expect(component.errors).toEqual(errorMock.error);
    })
  });

});
