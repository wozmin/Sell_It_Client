import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../core/models/users/user.model';
import {UsersService} from '../core/services/users.service';
import {UsersPageFilter} from '../core/models/users/users-page-filter.model';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public usersPageFilter: UsersPageFilter;
  public searchForm: FormGroup;
  public users: MatTableDataSource<User>;
 public search:FormControl;
  constructor(private _usersService: UsersService) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      page: new FormControl(1)
    });
    this.users = new MatTableDataSource<User>();
    this.search = new FormControl('');
  }

  public ngOnInit() {
    this.getUsers();
    this.search.valueChanges.subscribe(()=>{
      this._usersService.getByFilter({...this.searchForm.value,search:this.search.value}).subscribe((usersPageFilter: UsersPageFilter) => {
        this.users.data = usersPageFilter.results;
        this.usersPageFilter = usersPageFilter;
      });
    })
  }

  public getUsers(): void {
    this._usersService.getByFilter({...this.searchForm.value,search:this.search.value}).subscribe((usersPageFilter: UsersPageFilter) => {
      this.users.data = usersPageFilter.results;
      this.usersPageFilter = usersPageFilter;
    });
  }

}
