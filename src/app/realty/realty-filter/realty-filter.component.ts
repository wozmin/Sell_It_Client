import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-realty-filter',
  templateUrl: './realty-filter.component.html',
  styleUrls: ['./realty-filter.component.scss']
})
export class RealtyFilterComponent implements OnInit {
  @Input() searchForm: FormGroup;

  @Output() onReset = new EventEmitter();


  constructor() {

  }

  ngOnInit() {
  }

  public resetFilter(): void {
    this.onReset.emit();
  }

}
