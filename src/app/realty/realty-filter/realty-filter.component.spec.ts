import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RealtyFilterComponent} from './realty-filter.component';

describe('RealtyFilterComponent', () => {
  let component: RealtyFilterComponent;
  let fixture: ComponentFixture<RealtyFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealtyFilterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
