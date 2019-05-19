import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RealtyFavoriteListComponent} from './realty-favorite-list.component';

describe('RealtyFavoriteListComponent', () => {
  let component: RealtyFavoriteListComponent;
  let fixture: ComponentFixture<RealtyFavoriteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealtyFavoriteListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtyFavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
