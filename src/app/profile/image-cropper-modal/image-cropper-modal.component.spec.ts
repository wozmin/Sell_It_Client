import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropperModalComponent } from './image-cropper-modal.component';
import {SharedModule} from '../../shared/shared.module';
import {ImageCroppedEvent, ImageCropperModule} from 'ngx-image-cropper';
import {TranslateModule, TranslateStore} from '@ngx-translate/core';

describe('ImageCropperModalComponent', () => {
  let component: ImageCropperModalComponent;
  let fixture: ComponentFixture<ImageCropperModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCropperModalComponent ],
      providers:[TranslateStore],
      imports:[SharedModule,ImageCropperModule,TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change image',()=>{
    spyOn(component.onChangeImage,'emit');
    component.changeImage();
    expect(component.onChangeImage.emit).toHaveBeenCalled();
  });

  it('should apply cropped image',()=>{
    spyOn(component.apply,'emit');
    component.applyCroppedImage();
    expect(component.apply.emit).toHaveBeenCalled();
  });

  it('should crop image',()=>{
    let mockFile = new File(['123'],'test.jpg');
    let mockEvent:ImageCroppedEvent = {
        width:123,
        height:123,
        cropperPosition:null,
        imagePosition:null,
        file:mockFile
      };
    component.imageCropped(mockEvent);
    expect(component.croppedFile).toEqual(mockFile);
  })

});
