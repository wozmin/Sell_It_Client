import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {RealtyService} from "../../core/services/realty.service";
import {RealtyDetails} from "../../core/models/realty/realty-details.model";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions, NgxGalleryOrder} from 'ngx-gallery';
import {SpinnerService} from '../../core/services/ui/spinner.service';
import {AttachedImage} from '../../core/models/realty/attached-image.model';

@Component({
  selector: 'app-realty-details',
  templateUrl: './realty-details.component.html',
  styleUrls: ['./realty-details.component.scss']
})
export class RealtyDetailsComponent implements OnInit {
  realty:RealtyDetails;
  public sharedUrl:string;
  isEditable:boolean = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private _route: ActivatedRoute, private _realtyService: RealtyService, private _spinnerService: SpinnerService) {

  }

  ngOnInit() {
    this._spinnerService.isLoading.next(true);
      this._route.params.pipe(
        map(params=>params['id']),
        switchMap(id=>this._realtyService.getById(id))
      ).subscribe((realty:RealtyDetails)=>{
        this._spinnerService.isLoading.next(false);
          this.realty = realty;
        this._realtyService.getRealtyShareKey(realty.id).subscribe((key: string) => {
          this.sharedUrl = `http://sell-it-app.herokuapp.com/realty/${realty.id}/shared?uid=${key}`;
        });
        // this.realtyForm.disable();
        this.galleryOptions = [
          {
            breakpoint:768,
            width: '100%',
            height: '250px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            imageAutoPlay:true,
            previewCloseOnEsc:true,
            thumbnailsOrder: NgxGalleryOrder.Row,
            imageSize: NgxGalleryImageSize.Contain,
            imageAutoPlayPauseOnHover: true
          },
          {
            breakpoint:1200,
            width: '100%',
            height: '600px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            imageAutoPlay:true,
            previewCloseOnEsc:true,
            thumbnailsOrder: NgxGalleryOrder.Row,
            imageSize: NgxGalleryImageSize.Contain,
            imageAutoPlayPauseOnHover: true
          },
          {
            width: '100%',
            height: '650px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            imageAutoPlay:true,
            previewCloseOnEsc:true,
            thumbnailsOrder: NgxGalleryOrder.Row,
            imageSize: NgxGalleryImageSize.Contain,
            imageAutoPlayPauseOnHover: true
          }
        ];
        this.galleryImages = [];
        if(this.realty.photos.length > 0 ){
          this.realty.photos.map((img:AttachedImage)=>{
            this.galleryImages.push({small:img.photo,medium:img.photo,big:img.photo})
          });
        }
        else{
          this.galleryImages.push({
            small: 'assets/images/default-realty-image.jpg',
            medium: 'assets/images/default-realty-image.jpg',
            big: 'assets/images/default-realty-image.jpg'
          })
        }


      },() => this._spinnerService.isLoading.next(false) )
  }

  saveRealty():void{
    this.isEditable = false;
  }

  public onShare(event) {
    console.log(event);
    event.preventDefault();
    console.log('hsate');
  }

}
