import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RealtyListComponent} from "./realty-list.component";
import {SharedModule} from "../shared/shared.module";
import {RealtyRoutingModule} from "./realty-routing.module";
import {MatProgressSpinnerModule} from "@angular/material";
import {RealtyDetailsComponent} from "./realty-details/realty-details.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxGalleryModule} from 'ngx-gallery';
import {FileDropModule} from 'ngx-file-drop';
import { RealtyEditComponent } from './realty-edit/realty-edit.component';

@NgModule({
  declarations: [RealtyListComponent, RealtyDetailsComponent, RealtyEditComponent],
  imports: [
    RealtyRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatProgressSpinnerModule,
    NgxGalleryModule,
    FileDropModule
  ]
})
export class RealtyModule { }
