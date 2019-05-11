import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Realty} from '../core/models/realty/realty.model';
import {RealtyService} from '../core/services/realty.service';
import {FormControl, FormGroup} from '@angular/forms';
import {RealtyFilter} from '../core/models/realty/realty-filter.model';
import {debounceTime, skip, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-realty-list',
  templateUrl: './realty-list.component.html',
  styleUrls: ['./realty-list.component.scss']
})
export class RealtyListComponent implements OnInit {

  public realty:Realty[] = [];
  public searchForm: FormGroup;

  constructor(private _realtyService: RealtyService) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      rooms: new FormControl(1),
      price: new FormControl(null)
    });
  }

  ngOnInit() {
    this._realtyService.getAll().subscribe((realty:Realty[])=>{
      this.realty = realty;
    });
    this.onFilterRealty();
  }

  public onFilterRealty(): void {
    this.searchForm
      .valueChanges
      .pipe(
        skip(1),
        debounceTime(500),
        switchMap((val: RealtyFilter) => this._realtyService.getAllByFilter(val))
      ).subscribe((realty:Realty[])=>{
        this.realty = realty;
    });
  }

}
