import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceFooterComponent } from './advance-footer.component';

describe('AdvanceFooterComponent', () => {
  let component: AdvanceFooterComponent;
  let fixture: ComponentFixture<AdvanceFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
