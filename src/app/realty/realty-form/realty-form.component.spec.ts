import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RealtyFormComponent} from './realty-form.component';
import {SharedModule} from '../../shared/shared.module';

describe('RealtyFormComponent', () => {
  let component: RealtyFormComponent;
  let fixture: ComponentFixture<RealtyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[SharedModule],
      declarations: [RealtyFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
