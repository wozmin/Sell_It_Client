import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundComponent} from "./not-found/not-found.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports:[NotFoundComponent]

})
export class StaticModule { }
