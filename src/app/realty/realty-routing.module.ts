import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RealtyListComponent} from "./realty-list.component";
import {RealtyDetailsComponent} from "./realty-details/realty-details.component";
import {RealtyEditComponent} from './realty-edit/realty-edit.component';
import {RealtyAddComponent} from './realty-add/realty-add.component';

const routes: Routes = [
  {
    path:'',
    component:RealtyListComponent
  },
  {
    path:'add',
    component:RealtyAddComponent
  },
  {
    path:'details/:id',
    component:RealtyDetailsComponent
  },
  {
    path:'edit/:id',
    component:RealtyEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealtyRoutingModule { }
