import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePopupHelperComponent } from './home-popup-helper.component';

describe('HomePopupHelperComponent', () => {
  let component: HomePopupHelperComponent;
  let fixture: ComponentFixture<HomePopupHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePopupHelperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePopupHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
