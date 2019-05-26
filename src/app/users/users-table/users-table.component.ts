import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../core/models/users/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  @Input() users: User[] = [];

  @Output() onUserRemove = new EventEmitter();

  public displayedColumns: string[] = [];

  constructor() {
    this.displayedColumns = [
      'avatar', 'name', 'email', 'phone'
    ];
  }

  public deleteUser(): void {
    this.onUserRemove.emit();
  }


}
