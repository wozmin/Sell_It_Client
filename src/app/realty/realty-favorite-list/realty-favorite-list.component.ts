import {Component, OnInit} from '@angular/core';
import {Realty} from '../../core/models/realty/realty.model';
import {RealtyService} from '../../core/services/realty.service';

@Component({
  selector: 'app-realty-favorite-list',
  templateUrl: './realty-favorite-list.component.html',
  styleUrls: ['./realty-favorite-list.component.scss']
})
export class RealtyFavoriteListComponent implements OnInit {

  public realty: Realty[] = [];

  constructor(private _realtyService: RealtyService) {

  }

  ngOnInit() {
    this.getRealty();
  }

  public getRealty(): void {
    this._realtyService.getFavoriteRealty().subscribe((realty: Realty[]) => {
      this.realty = realty;
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


}
