import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RealtyFilter} from '../../core/models/realty/realty-filter.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-realty-filter-dialog',
  templateUrl: './realty-filter-dialog.component.html',
  styleUrls: ['./realty-filter-dialog.component.scss']
})
export class RealtyFilterDialogComponent implements OnInit {
  public searchForm: FormGroup;
  public onFilterChange: Subject<RealtyFilter> = new Subject<RealtyFilter>();

  constructor() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      rooms: new FormControl(null),
      price: new FormControl(null),
      sortingOrder: new FormControl(null),
      resourcetype: new FormControl('Apartment'),
      area: new FormControl(null),
      floor: new FormControl(null)
    });
    this.searchForm.valueChanges.subscribe((realtyFilter: RealtyFilter) => {
      this.onFilterChange.next(realtyFilter);
    });
  }

  ngOnInit() {
  }

}
