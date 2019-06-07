import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersTableComponent} from './users-table/users-table.component';
import {MatMenuModule, MatRippleModule, MatSortModule, MatTableModule} from '@angular/material';
import {UsersRoutingModule} from './users-routing.module';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  declarations: [UsersComponent, UsersTableComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatMenuModule,
    MatTableModule,
    MatRippleModule,
    MatSortModule,
    SharedModule,
    TranslateModule.forChild(),
    InfiniteScrollModule
  ]
})
export class UsersModule {
}
