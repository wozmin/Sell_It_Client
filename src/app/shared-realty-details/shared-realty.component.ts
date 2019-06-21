import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {RealtyService} from "../core/services/realty.service";
import {RealtyDetails} from "../core/models/realty/realty-details.model";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions, NgxGalleryOrder} from 'ngx-gallery';
import {SpinnerService} from '../core/services/ui/spinner.service';
import {AttachedImage} from '../core/models/realty/attached-image.model';
import {LanguageService} from '../core/services/language.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-shared-realty',
  templateUrl: './shared-realty.component.html',
  styleUrls: ['./shared-realty.component.scss']
})
export class SharedRealtyComponent implements OnInit {
  realty:RealtyDetails;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  languages: any = [];
  selectedLanguage: any;

  constructor(
    private _route: ActivatedRoute,
    private _realtyService: RealtyService,
    private _spinnerService: SpinnerService,
    private _languageService: LanguageService,
    private _translateService: TranslateService
  ) {
    this.languages = [
      {
        id: 'uk',
        title: 'English',
        flag: 'uk'
      },
      {
        id: 'ua',
        title: 'Ukrainian',
        flag: 'ua'
      }
    ];
  }

  ngOnInit() {
    this.selectedLanguage = this.languages.find(lang => lang.id === this._translateService.currentLang);
    this._spinnerService.isLoading.next(true);
      this._route.params.pipe(
        map(params => params['id']),
        switchMap(uid => this._realtyService.getById(uid))
      ).subscribe((realty:RealtyDetails)=>{
        this._spinnerService.isLoading.next(false);
          this.realty = realty;
          this.realty.ownerName = "Taras Sheketa";
          this.realty.ownerPhone = "380979120963";
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


  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    // this._translateService.use(lang.id);
    this._languageService.onLanguageChange.next(lang.id);
    localStorage.setItem('lang', lang.id);
  }



}
