import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from "./layout.component";

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path: '',
        redirectTo: 'realty',
        pathMatch: 'prefix'
      },
      {
        path:'profile',
        loadChildren:'../profile/profile.module#ProfileModule'
      },
      {
        path: 'realty',
        loadChildren: '../realty/realty.module#RealtyModule'
      },
      {
        path: 'users',
        loadChildren: '../users/users.module#UsersModule'
      },
      {
        path:'**',
        redirectTo:'/not-found'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
