import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {User} from '../../core/models/users/user.model';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

  @Input() users: MatTableDataSource<User>;

  @Output() onUserRemove = new EventEmitter();

  @Output() onScroll = new EventEmitter();

  public displayedColumns: string[] = [];

  constructor() {
    this.displayedColumns = [
      'avatar', 'name', 'email', 'phone'
    ];
  }

  public ngAfterViewInit(): void {
    this.users.sort = this.sort;
  }

  public deleteUser(): void {
    this.onUserRemove.emit();
  }

  public loadMore():void{
    this.onScroll.emit();
  }


}
