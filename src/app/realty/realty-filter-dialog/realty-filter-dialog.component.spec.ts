import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RealtyFilterDialogComponent} from './realty-filter-dialog.component';

describe('RealtyFilterDialogComponent', () => {
  let component: RealtyFilterDialogComponent;
  let fixture: ComponentFixture<RealtyFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealtyFilterDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtyFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
