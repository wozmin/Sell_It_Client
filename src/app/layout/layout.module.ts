import {NgModule} from "@angular/core";
import {LayoutComponent} from "./layout.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {
   MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatToolbarModule
} from "@angular/material";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {LayoutRoutingModule} from "./layout-routing.module";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports:[
    LayoutRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  declarations:[
    LayoutComponent,
    ToolbarComponent,
  ],
  exports:[LayoutComponent]
})
export class LayoutModule{}
