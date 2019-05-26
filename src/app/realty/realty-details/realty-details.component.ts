import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {RealtyService} from "../../core/services/realty.service";
import {RealtyDetails} from "../../core/models/realty/realty-details.model";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions, NgxGalleryOrder} from 'ngx-gallery';
import {SpinnerService} from '../../core/services/ui/spinner.service';
import {AttachedImage} from '../../core/models/realty/attached-image.model';

@Component({
  selector: 'app-realty-details',
  templateUrl: './realty-details.component.html',
  styleUrls: ['./realty-details.component.scss']
})
export class RealtyDetailsComponent implements OnInit {
  realty:RealtyDetails;
  pageType:any;
  isEditable:boolean = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  socialsUrl: string;

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
            thumbnailsOrder:NgxGalleryOrder.Row
          },
          {
            breakpoint:1200,
            width: '100%',
            height: '600px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            imageAutoPlay:true,
            previewCloseOnEsc:true,
            thumbnailsOrder:NgxGalleryOrder.Row
          },
          {
            width: '100%',
            height: '650px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            imageAutoPlay:true,
            previewCloseOnEsc:true,
            thumbnailsOrder:NgxGalleryOrder.Row
          }
        ];
        this.galleryImages = [
          {
            small: 'https://www.blaupunkt.com/uploads/tx_ddfproductsbp/BP430500FHS%20-%201_0.jpg',
            medium: 'https://www.blaupunkt.com/uploads/tx_ddfproductsbp/BP430500FHS%20-%201_0.jpg',
            big: 'https://www.blaupunkt.com/uploads/tx_ddfproductsbp/BP430500FHS%20-%201_0.jpg'
          },

        ];
        this.realty.photos.map((img:AttachedImage)=>{
          this.galleryImages.push({small:img.photo,medium:img.photo,big:img.photo})
        });

      },() => this._spinnerService.isLoading.next(false) )
  }

  saveRealty():void{
    this.isEditable = false;
  }

}
