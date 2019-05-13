import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RealtyDetails} from '../../core/models/realty/realty-details.model';

@Component({
  selector: 'app-realty-form',
  templateUrl: './realty-form.component.html',
  styleUrls: ['./realty-form.component.scss']
})
export class RealtyFormComponent implements OnInit {
  addedPhotos:File[] = [];
  @Input() realty:RealtyDetails;

  @Output() onSubmit = new EventEmitter<RealtyDetails>();
  @Output() onCancel = new EventEmitter();

  isApartment:boolean = false;
  realtyForm:FormGroup;
  constructor() {
    this.realtyForm = new FormGroup({
      title:new  FormControl(),
      description: new  FormControl(),
      price: new  FormControl(),
      currency: new  FormControl('$'),
      area: new  FormControl(),
      flooring:new  FormControl(),
      rooms:new  FormControl(),
      ownerPhone: new  FormControl(),
      ownerName: new  FormControl(),
      offer: new  FormControl(),
      creator: new  FormControl(),
      floor: new  FormControl(),
      kitchenArea: new  FormControl(null),
      resourcetype:new  FormControl(),
      fieldArea: new FormControl(null)
    });
  }

  ngOnInit() {
    if(this.realty){
      this.realtyForm.controls.title.setValue(this.realty.title);
      this.realtyForm.controls.description.setValue(this.realty.description);
      this.realtyForm.controls.currency.setValue(this.realty.currency);
      this.realtyForm.controls.area.setValue(this.realty.area);
      this.realtyForm.controls.flooring.setValue(this.realty.flooring);
      this.realtyForm.controls.rooms.setValue(this.realty.rooms);
      this.realtyForm.controls.ownerPhone.setValue(this.realty.ownerPhone);
      this.realtyForm.controls.ownerName.setValue(this.realty.ownerName);
      this.realtyForm.controls.offer.setValue(this.realty.offer);
      this.realtyForm.controls.creator.setValue(this.realty.creator);
      this.realtyForm.controls.floor.setValue(this.realty.floor);
      this.realtyForm.controls.kitchenArea.setValue(this.realty.kitchenArea);
      this.realtyForm.controls.resourcetype.setValue(this.realty.resourcetype);
      this.realtyForm.controls.price.setValue(this.realty.price);
      this.realtyForm.controls.fieldArea.setValue(this.realty.fieldArea);
    }

    this.realtyForm.valueChanges.subscribe(realty=>{
      this.isApartment = realty.resourcetype == 'Apartment';
    })
  }

  public submit(realty:RealtyDetails):void{
    this.onSubmit.emit({...realty,photos:this.addedPhotos});
  }

  public cancel():void{
    this.onCancel.emit();
  }

  public onFileDropped(photos){
    this.addedPhotos = this.addedPhotos.concat(photos);
  }

}
