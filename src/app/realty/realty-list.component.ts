import {Component, OnInit} from '@angular/core';
import {RealtyService} from '../core/services/realty.service';
import {FormControl, FormGroup} from '@angular/forms';
import {RealtyFilter} from '../core/models/realty/realty-filter.model';
import {debounceTime, skip, switchMap} from 'rxjs/operators';
import {RealtyPageFilter} from '../core/models/realty/realty-page-filter.model';
import {tap} from 'rxjs/internal/operators/tap';
import {Realty} from '../core/models/realty/realty.model';

@Component({
  selector: 'app-realty-list',
  templateUrl: './realty-list.component.html',
  styleUrls: ['./realty-list.component.scss']
})
export class RealtyListComponent implements OnInit {
  public page: number = 1;
  public realtyPageFilter: RealtyPageFilter;
  public searchForm: FormGroup;
  public realty: Realty[] = [];

  constructor(private _realtyService: RealtyService) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      rooms: new FormControl(null),
      price: new FormControl(null)
    });
  }

  ngOnInit() {
    this.getRealty();
    this.onFilterRealty();
  }

  public getRealty(): void {
    this._realtyService.getAllByFilter(this.searchForm.value, this.page).subscribe((realtyPageFilter: RealtyPageFilter) => {
      this.realtyPageFilter = realtyPageFilter;
      this.realty = this.realty.concat(realtyPageFilter.results);
    });
  }

  public onFilterRealty(): void {
    this.searchForm
      .valueChanges
      .pipe(
        skip(1),
        debounceTime(500),
        tap(() => {
          this.page = 1;
          this.realty = [];
        }),
        switchMap((val: RealtyFilter) => this._realtyService.getAllByFilter(val, this.page))
      ).subscribe((realtyPageFilter: RealtyPageFilter) => {
      this.realtyPageFilter = realtyPageFilter;
      this.realty = this.realty.concat(realtyPageFilter.results);
    });
  }

  public resetFilter():void{
    this.searchForm.controls.price.setValue(null);
    this.searchForm.controls.rooms.setValue(null);
  }

  public loadMore(): void {
    if (this.realtyPageFilter.next) {
      this.page++;
      this.getRealty();
    }
  }

}
