import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAvatarAndUsernameComponent } from './preview-avatar-and-username.component';

describe('PreviewAvatarAndUsernameComponent', () => {
  let component: PreviewAvatarAndUsernameComponent;
  let fixture: ComponentFixture<PreviewAvatarAndUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAvatarAndUsernameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewAvatarAndUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
