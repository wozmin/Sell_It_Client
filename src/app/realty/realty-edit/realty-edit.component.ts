import {Component, OnInit} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {RealtyDetails} from '../../core/models/realty/realty-details.model';
import {RealtyService} from '../../core/services/realty.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SpinnerService} from '../../core/services/ui/spinner.service';

@Component({
  selector: 'app-realty-edit',
  templateUrl: './realty-edit.component.html',
  styleUrls: ['./realty-edit.component.scss']
})
export class RealtyEditComponent implements OnInit {
  realty: RealtyDetails;
  id: number;

  constructor(private _router: Router, private _route: ActivatedRoute, private _realtyService: RealtyService, private _spinnerService: SpinnerService) {

  }

  ngOnInit() {
    this._route.params.pipe(
      map(params => params['id']),
      map((id: number) => {
        this.id = id;
        this._spinnerService.isLoading.next(true);
        return id;
      }),
      switchMap(id => this._realtyService.getById(id))
    ).subscribe((realty: RealtyDetails) => {
      this.realty = realty;
      this._spinnerService.isLoading.next(false);
    });
  }

  public save(realty: RealtyDetails): void {
    this._realtyService.update({...realty, id: this.id}).subscribe(() => {
      this._router.navigate(['/realty/details', this.id]);
    });
  }

  public onCancel(): void {
    this._router.navigate(['/realty/details', this.id]);
  }


}
