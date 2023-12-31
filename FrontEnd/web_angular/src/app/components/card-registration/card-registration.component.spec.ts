import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRegistrationComponent } from './card-registration.component';

describe('CardRegistrationComponent', () => {
  let component: CardRegistrationComponent;
  let fixture: ComponentFixture<CardRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
