import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {RealtyService} from "../../core/services/realty.service";
import {RealtyDetails} from "../../core/models/realty/realty-details.model";
import {FormControl, FormGroup} from "@angular/forms";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions, NgxGalleryOrder} from 'ngx-gallery';

@Component({
  selector: 'app-realty-details',
  templateUrl: './realty-details.component.html',
  styleUrls: ['./realty-details.component.scss']
})
export class RealtyDetailsComponent implements OnInit {
  realty:RealtyDetails;
  pageType:any;
  realtyForm:FormGroup;
  isEditable:boolean = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private _route:ActivatedRoute,private _realtyService:RealtyService) {

  }

  ngOnInit() {
      this._route.params.pipe(
        map(params=>params['id']),
        switchMap(id=>this._realtyService.getById(id))
      ).subscribe((realty:RealtyDetails)=>{
          this.realty = realty;
          this.realtyForm = new FormGroup({
              title:new  FormControl(realty.title),
              description: new  FormControl(realty.description),
              price: new  FormControl(realty.price),
              currency: new  FormControl(realty.currency),
              area: new  FormControl(realty.area),
              flooring:new  FormControl(realty.flooring),
              rooms:new  FormControl(realty.rooms),
              ownerPhone: new  FormControl(realty.ownerPhone),
              ownerName: new  FormControl(realty.ownerName),
              offer: new  FormControl(realty.offer),
              creator: new  FormControl(realty.creator),
              link: new  FormControl(realty.link),
              floor: new  FormControl(realty.floor),
              kitchenArea: new  FormControl(realty.kitchenArea),
              resourcetype:new  FormControl(realty.resourcetype)
        });
        this.realtyForm.disable();
        this.galleryOptions = [
          {
            breakpoint:768,
            width: '90%',
            height: '300px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            imageAutoPlay:true,
            previewCloseOnEsc:true,
            thumbnailsOrder:NgxGalleryOrder.Row
          },
          {
            breakpoint:1200,
            width: '90%',
            height: '600px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            imageAutoPlay:true,
            previewCloseOnEsc:true,
            thumbnailsOrder:NgxGalleryOrder.Row
          },
          {
            width: '90%',
            height: '800px',
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
          {
            small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/2-small.jpeg',
            medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/2-medium.jpeg',
            big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/2-big.jpeg'
          },
          {
            small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-small.jpeg',
            medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-medium.jpeg',
            big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-big.jpeg'
          },
          {
            small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-small.jpeg',
            medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-medium.jpeg',
            big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-big.jpeg'
          },
          {
            small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-small.jpeg',
            medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-medium.jpeg',
            big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-big.jpeg'
          }
        ];
      })
  }

  addRealty():void{}

  editRealty():void{
    this.isEditable = true;
    this.realtyForm.enable();
  }

  saveRealty():void{
    this.isEditable = false;
    this.realtyForm.disable();
  }

}
