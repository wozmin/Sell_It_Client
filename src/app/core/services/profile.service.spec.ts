import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {fakeAsync, TestBed, tick} from "@angular/core/testing";
import {ProfileService} from "./profile.service";

import {environment} from "../../../environments/environment";
import {Profile} from "../models/profile/profile.model";
import {Utils} from '../utils';

describe('Service: ProfileService', () => {
    let service: ProfileService, httpMock: HttpTestingController;
    const apiUrl = environment.apiUrl+"users/profile/";
    beforeEach(() => {
        TestBed.configureTestingModule({imports: [HttpClientTestingModule], providers: [ProfileService]});
        service = TestBed.get(ProfileService);
        httpMock = TestBed.get(HttpTestingController);
    });
    
    afterEach(()=>{
        httpMock.verify();
    });

    it('should be created', () => {
        const service: ProfileService = TestBed.get(ProfileService);
        expect(service).toBeTruthy();
    });
    
    it('should get current user profile info',fakeAsync(()=>{
        const profileModel = {
            first_name:"fistName",
            last_name:"lastName",
            gender:"Male",
            image:"image-link",
            username:"userName",
            email:"soeemsa@mail.com",
            birth_date: null,
            phone:"38097831324"
        };
        const expectedResponse:Profile = {
            firstName:"fistName",
            lastName:"lastName",
            gender:"Male",
            image:"image-link",
            username:"userName",
            email:"soeemsa@mail.com",
            birthDate: null,
            phone:"38097831324"
         };
        
        let response:Profile;
        service.getCurrentUserProfileInfo().subscribe(
            res => response = res
        );
        
        const requestWrapper = httpMock.expectOne({url:apiUrl});
        requestWrapper.flush(profileModel);
        
        tick();
        expect(requestWrapper.request.method).toEqual('GET');
        expect(requestWrapper.request.url).toEqual(apiUrl);
        expect(response).toEqual(expectedResponse);
        
    }));
    
    it('should update profile correctly',fakeAsync(()=>{
      const profileModel:Profile = {
        firstName:"fistName",
        lastName:"lastName",
        gender:"Male",
        image:"image-link",
        username:"userName",
        email:"soeemsa@mail.com",
        birthDate: null,
        phone:"38097831324"
      };

      let response:Object;
      service.update(profileModel).subscribe(
        res => response = res
      );

      const requestWrapper = httpMock.expectOne({url:apiUrl});
      requestWrapper.flush(Utils.toSnakeCase(profileModel));

      tick();
      expect(requestWrapper.request.method).toEqual('PATCH');
      expect(requestWrapper.request.url).toEqual(apiUrl);
      expect(response).toEqual(profileModel);
    }));

  it('should change avatar correctly',fakeAsync(()=>{
    const profileModelMock:Profile = {
      firstName:"fistName",
      lastName:"lastName",
      gender:"Male",
      image:"image-link",
      username:"userName",
      email:"soeemsa@mail.com",
      birthDate: null,
      phone:"38097831324"
    };
    let avatarMock:File = new File(['20444'],'test-file.jpg'), actual:string;
    service.changeAvatar(avatarMock).subscribe(
      res => actual = res
    );

    const requestWrapper = httpMock.expectOne({url:apiUrl});
    requestWrapper.flush(Utils.toSnakeCase(profileModelMock));
    tick();
    expect(requestWrapper.request.method).toEqual('PATCH');
    expect(requestWrapper.request.url).toEqual(apiUrl);
    expect(actual).toEqual(profileModelMock.image);
  }));
});
