import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageSelectionComponent } from './coverage-selection.component';

describe('CoverageSelectionComponent', () => {
  let component: CoverageSelectionComponent;
  let fixture: ComponentFixture<CoverageSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverageSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
