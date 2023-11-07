import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDataInputsComponent } from './general-data-inputs.component';

describe('GeneralDataInputsComponent', () => {
  let component: GeneralDataInputsComponent;
  let fixture: ComponentFixture<GeneralDataInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralDataInputsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralDataInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
