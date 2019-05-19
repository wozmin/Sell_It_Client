import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Realty} from '../../core/models/realty/realty.model';

@Component({
  selector: 'app-realty',
  templateUrl: './realty.component.html',
  styleUrls: ['./realty.component.scss']
})
export class RealtyComponent implements OnInit {
  @Input() realty: Realty;

  @Output() onAddToFavorite = new EventEmitter<Realty>();
  @Output() onRemoveFromFavorite = new EventEmitter<Realty>();

  constructor() {
  }

  ngOnInit() {
  }

  public addToFavorite(realty: Realty): void {
    this.onAddToFavorite.emit(realty);
  }

  public removeFromFavorite(realty: Realty): void {
    this.onRemoveFromFavorite.emit(realty);
  }

}
