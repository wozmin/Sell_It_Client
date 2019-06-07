import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SharedRealtyComponent} from './shared-realty.component';




describe('RealtyDetailsComponent', () => {
  let component: SharedRealtyComponent;
  let fixture: ComponentFixture<SharedRealtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedRealtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedRealtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
