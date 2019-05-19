import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RealtyDetails} from '../../core/models/realty/realty-details.model';
import {FileSystemFileEntry, UploadEvent} from 'ngx-file-drop';
import {Utils} from '../../core/utils';
import {AttachedImage} from '../../core/models/realty/attached-image.model';

@Component({
  selector: 'app-realty-form',
  templateUrl: './realty-form.component.html',
  styleUrls: ['./realty-form.component.scss']
})
export class RealtyFormComponent implements OnInit, OnChanges {
  addedPhotos: File[] = [];
  images: Array<AttachedImage> = [];
  @Input()
  errors: any;
  @Input() realty: RealtyDetails;

  @Output() onSubmit = new EventEmitter<RealtyDetails>();
  @Output() onCancel = new EventEmitter();

  isApartment: boolean = false;
  realtyForm: FormGroup;

  constructor() {
    this.realtyForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      description: new FormControl(),
      price: new FormControl(1, [Validators.required]),
      currency: new FormControl('$'),
      area: new FormControl(1, [Validators.required, Validators.max(1000), Validators.min(1)]),
      flooring: new FormControl(1, [Validators.required, Validators.max(100), Validators.min(1)]),
      rooms: new FormControl(1, [Validators.required, Validators.max(20), Validators.min(1)]),
      ownerPhone: new FormControl('', [Validators.required, Validators.pattern('^\\+?3?8?(0\\d{9})$')]),
      ownerName: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.min(1)]),
      offer: new FormControl('Sale'),
      floor: new FormControl(1, [Validators.required, Validators.max(100), Validators.min(1)]),
      kitchenArea: new FormControl(1, [Validators.required, Validators.max(1000), Validators.min(1)]),
      resourcetype: new FormControl('Building'),
      fieldArea: new FormControl(1, [Validators.required, Validators.max(1000), Validators.min(1)])
    });
  }

  ngOnInit() {
    if (this.realty) {
      this.realtyForm.controls.title.setValue(this.realty.title);
      this.realtyForm.controls.description.setValue(this.realty.description);
      this.realtyForm.controls.currency.setValue(this.realty.currency);
      this.realtyForm.controls.area.setValue(this.realty.area);
      this.realtyForm.controls.flooring.setValue(this.realty.flooring);
      this.realtyForm.controls.rooms.setValue(this.realty.rooms);
      this.realtyForm.controls.ownerPhone.setValue(this.realty.ownerPhone);
      this.realtyForm.controls.ownerName.setValue(this.realty.ownerName);
      this.realtyForm.controls.offer.setValue(this.realty.offer);
      this.realtyForm.controls.floor.setValue(this.realty.floor);
      this.realtyForm.controls.kitchenArea.setValue(this.realty.kitchenArea || 1);
      this.realtyForm.controls.resourcetype.setValue(this.realty.resourcetype);
      this.realtyForm.controls.price.setValue(this.realty.price);
      this.realtyForm.controls.fieldArea.setValue(this.realty.fieldArea || 1);
      this.isApartment = this.realty.resourcetype == 'Apartment';
    }

    this.realtyForm.valueChanges.subscribe(realty => {
      this.isApartment = realty.resourcetype == 'Apartment';
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.realtyForm.invalid);
    console.log(this.realtyForm.errors);
    if (changes.errors && changes.errors.currentValue) {
      this.errors = Utils.toCamelCase(changes.errors.currentValue);
      Object.keys(this.errors).map(key => {
        this.realtyForm.controls[key].setErrors({invalid: true});
      });
    }
  }

  public submit(realty: RealtyDetails): void {
    this.onSubmit.emit({...realty, photos: this.addedPhotos});
  }

  public cancel(): void {
    this.onCancel.emit();
  }

  public onFileDropped($event: UploadEvent) {
    const droppedFile = $event.files[0];
    const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    const reader = new FileReader();

    fileEntry.file(file => {
      this.addedPhotos.push(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        let image: AttachedImage = {
          image: reader.result as string,
          isLoaded: false
        };
        this.images.push(image);
        setTimeout(() => {
          image.isLoaded = true;
        }, 5000);
      };
    });
  }

  public removeImage(image): void {
    this.images = this.images.filter(img => img !== image);
  }


}
