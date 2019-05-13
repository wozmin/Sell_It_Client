import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtyAddComponent } from './realty-add.component';

describe('RealtyAddComponent', () => {
  let component: RealtyAddComponent;
  let fixture: ComponentFixture<RealtyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
