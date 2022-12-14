import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesPopupHelperComponent } from './grades-popup-helper.component';

describe('GradesPopupHelperComponent', () => {
  let component: GradesPopupHelperComponent;
  let fixture: ComponentFixture<GradesPopupHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesPopupHelperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradesPopupHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
