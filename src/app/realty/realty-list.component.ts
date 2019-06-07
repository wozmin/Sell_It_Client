import {Component, OnInit} from '@angular/core';
import {RealtyService} from '../core/services/realty.service';
import {FormControl, FormGroup} from '@angular/forms';
import {RealtyFilter} from '../core/models/realty/realty-filter.model';
import {debounceTime, skip, switchMap} from 'rxjs/operators';
import {RealtyPageFilter} from '../core/models/realty/realty-page-filter.model';
import {tap} from 'rxjs/internal/operators/tap';
import {Realty} from '../core/models/realty/realty.model';
import {SpinnerService} from '../core/services/ui/spinner.service';
import {MatDialog} from '@angular/material';
import {RealtyFilterDialogComponent} from './realty-filter-dialog/realty-filter-dialog.component';
import {Observable} from 'rxjs';

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

  constructor(private _realtyService: RealtyService, private _spinnerService: SpinnerService, private _modalDialog: MatDialog) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      rooms: new FormControl(null),
      price: new FormControl(null),
      sortingOrder: new FormControl(null),
      resourcetype: new FormControl('Apartment'),
      area: new FormControl(null),
      floor: new FormControl(null)
    });
  }

  ngOnInit() {
    this.getRealty();
    this.onFilterRealty(this.searchForm.valueChanges);
  }

  public getRealty(): void {
    this._spinnerService.isLoading.next(true);
    this._realtyService.getAllByFilter(this.searchForm.value, this.page)
      .subscribe((realtyPageFilter: RealtyPageFilter) => {
        this._spinnerService.isLoading.next(false);
        this.realtyPageFilter = realtyPageFilter;
        this.realty = this.realty.concat(realtyPageFilter.results);
    },()=> this._spinnerService.isLoading.next(false));
  }

  public onFilterRealty(observable: Observable<any>): void {
    observable
      .pipe(
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

  public addToFavorite(realty: Realty): void {
    this._realtyService.addToFavorite(realty.id).subscribe(()=>{
      realty.liked = true;
    });
  }

  public removeFromFavorite(realty: Realty): void {
    this._realtyService.removeFromFavorite(realty.id).subscribe(()=>{
      realty.liked = false;
    });
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
