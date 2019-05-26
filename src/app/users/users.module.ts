import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersTableComponent} from './users-table/users-table.component';
import {MatMenuModule, MatRippleModule, MatTableModule} from '@angular/material';
import {UsersRoutingModule} from './users-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, UsersTableComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatMenuModule,
    MatTableModule,
    MatRippleModule,
    SharedModule
  ]
})
export class UsersModule {
}
