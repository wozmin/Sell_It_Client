import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RealtyEditComponent} from './realty-edit.component';

describe('RealtyEditComponent', () => {
  let component: RealtyEditComponent;
  let fixture: ComponentFixture<RealtyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealtyEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
