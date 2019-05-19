import {Component, OnInit} from '@angular/core';
import {RealtyPageFilter} from '../../core/models/realty/realty-page-filter.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Realty} from '../../core/models/realty/realty.model';
import {RealtyService} from '../../core/services/realty.service';
import {SpinnerService} from '../../core/services/ui/spinner.service';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {debounceTime, skip, switchMap, tap} from 'rxjs/operators';
import {RealtyFilter} from '../../core/models/realty/realty-filter.model';
import {RealtyFilterDialogComponent} from '../realty-filter-dialog/realty-filter-dialog.component';

@Component({
  selector: 'app-realty-favorite-list',
  templateUrl: './realty-favorite-list.component.html',
  styleUrls: ['./realty-favorite-list.component.scss']
})
export class RealtyFavoriteListComponent implements OnInit {

  public page: number = 1;
  public realtyPageFilter: RealtyPageFilter;
  public searchForm: FormGroup;
  public realty: Realty[] = [];

  constructor(private _realtyService: RealtyService, private _spinnerService: SpinnerService, private _modalDialog: MatDialog) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      rooms: new FormControl(null),
      price: new FormControl(null),
      sortingOrder: new FormControl(null)
    });
  }

  ngOnInit() {
    this.getRealty();
    this.onFilterRealty(this.searchForm.valueChanges);
  }

  public getRealty(): void {
    this._realtyService.getAllByFilter(this.searchForm.value, this.page).subscribe((realtyPageFilter: RealtyPageFilter) => {
      this.realtyPageFilter = realtyPageFilter;
      this.realty = this.realty.concat(realtyPageFilter.results);
    });
  }

  public onFilterRealty(observable: Observable<any>): void {
    observable
      .pipe(
        skip(1),
        debounceTime(500),
        tap(() => {
          this.page = 1;
          this.realty = [];
          this._spinnerService.isLoading.next(true);
        }),
        switchMap((val: RealtyFilter) => this._realtyService.getAllByFilter(val, this.page))
      ).subscribe((realtyPageFilter: RealtyPageFilter) => {
      this._spinnerService.isLoading.next(false);
      this.realtyPageFilter = realtyPageFilter;
      this.realty = this.realty.concat(realtyPageFilter.results);
    });
  }

  public resetFilter(): void {
    this.searchForm.controls.price.setValue(null);
    this.searchForm.controls.rooms.setValue(null);
  }

  public loadMore(): void {
    if (this.realtyPageFilter.next) {
      this.page++;
      this.getRealty();
    }
  }

  public addToFavorite(realty: Realty): void {
    realty.liked = true;
  }

  public removeFromFavorite(realty: Realty): void {
    realty.liked = false;
  }

  public openFilterModal(): void {
    const dialogRef = this._modalDialog.open(RealtyFilterDialogComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      panelClass: 'custom-dialog-container'
    });
    this.onFilterRealty(dialogRef.componentInstance.onFilterChange);
  }

}
