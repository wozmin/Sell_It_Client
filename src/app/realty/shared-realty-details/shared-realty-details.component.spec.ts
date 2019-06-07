import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SharedRealtyDetailsComponent} from './shared-realty-details.component';



describe('RealtyDetailsComponent', () => {
  let component: SharedRealtyDetailsComponent;
  let fixture: ComponentFixture<SharedRealtyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedRealtyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedRealtyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
