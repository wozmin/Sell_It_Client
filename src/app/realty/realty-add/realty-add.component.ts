import { Component, OnInit } from '@angular/core';
import {RealtyDetails} from '../../core/models/realty/realty-details.model';
import {Router} from '@angular/router';
import {RealtyService} from '../../core/services/realty.service';

@Component({
  selector: 'app-realty-add',
  templateUrl: './realty-add.component.html',
  styleUrls: ['./realty-add.component.scss']
})
export class RealtyAddComponent implements OnInit {

  constructor(private _router:Router, private _realtyService:RealtyService) { }

  ngOnInit() {
  }


  public save(realty:RealtyDetails):void{
    this._realtyService.add(realty).subscribe(()=>{
      this._router.navigate(['/realty']);
    })
  }

  public onCancel():void{
    this._router.navigate(['/realty']);
  }

}
