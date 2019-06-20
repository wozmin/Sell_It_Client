import {Component, OnInit} from '@angular/core';
import {Realty} from '../../core/models/realty/realty.model';
import {RealtyService} from '../../core/services/realty.service';
import {RealtyPageFilter} from '../../core/models/realty/realty-page-filter.model';
import {FormControl, FormGroup} from '@angular/forms';
import {SpinnerService} from '../../core/services/ui/spinner.service';
import {Observable} from 'rxjs';
import {debounceTime, skip, switchMap, tap} from 'rxjs/operators';
import {RealtyFilter} from '../../core/models/realty/realty-filter.model';

@Component({
  selector: 'app-realty-favorite-list',
  templateUrl: './realty-favorite-list.component.html',
  styleUrls: ['./realty-favorite-list.component.scss']
})
export class RealtyFavoriteListComponent implements OnInit {

  public realty: Realty[] = [];
  public page:number = 1;
  public realtyPageFilter: RealtyPageFilter;
  public searchForm: FormGroup;

  constructor(private _realtyService: RealtyService, private _spinnerService:SpinnerService) {
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
    this._realtyService.getFavoriteRealty(this.searchForm.value, this.page)
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
        switchMap((val: RealtyFilter) => this._realtyService.getFavoriteRealty(val, this.page))
      ).subscribe((realtyPageFilter: RealtyPageFilter) => {
      this._spinnerService.isLoading.next(false);
      this.realtyPageFilter = realtyPageFilter;
      this.realty = this.realty.concat(realtyPageFilter.results);
    });
  }

  public addToFavorite(realty: Realty): void {
    this._realtyService.addToFavorite(realty.id).subscribe(()=>{
      realty.liked = true;
    });
  }

  public removeFromFavorite(realty: Realty): void {
    this._realtyService.removeFromFavorite(realty.id).subscribe(()=>{
      this.realty =  this.realty.filter(x=>x.id !== realty.id);
    });
  }

  public resetFilter():void{
    this.searchForm.controls.price.setValue(null);
    this.searchForm.controls.rooms.setValue(null);
    this.searchForm.controls.floor.setValue(null);
    this.searchForm.controls.resourcetype.setValue(null);
  }

  public loadMore(): void {
    if (this.realtyPageFilter.next) {
      this.page++;
      this.getRealty();
    }
  }


}
