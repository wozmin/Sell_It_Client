import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper-modal',
  templateUrl: './image-cropper-modal.component.html',
  styleUrls: ['./image-cropper-modal.component.scss']
})
export class ImageCropperModalComponent implements OnInit {
  @Input() imageChangedEvent: any = '';

  @Output() apply = new EventEmitter<File>();

  @Output() onChangeImage = new EventEmitter();

  public croppedFile:Blob;

  constructor() { }

  ngOnInit() {
  }

  public imageCropped(event: ImageCroppedEvent):void {
    this.croppedFile =  event.file;
  }

  public changeImage():void{
    this.onChangeImage.emit();
  }

  public applyCroppedImage():void{
    let image = new File([this.croppedFile],"avatar.jpg",);
    this.apply.emit(image);
  }

}
