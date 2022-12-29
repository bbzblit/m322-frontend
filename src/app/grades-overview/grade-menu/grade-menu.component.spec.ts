import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesMenuComponent } from './grade-menu.component';

describe('HomeMenuComponent', () => {
  let component: GradesMenuComponent;
  let fixture: ComponentFixture<GradesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
