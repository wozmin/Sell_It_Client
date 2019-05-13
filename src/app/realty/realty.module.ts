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
import { RealtyFormComponent } from './realty-form/realty-form.component';
import { RealtyAddComponent } from './realty-add/realty-add.component';

@NgModule({
  declarations: [RealtyListComponent, RealtyDetailsComponent, RealtyEditComponent, RealtyFormComponent, RealtyAddComponent],
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
