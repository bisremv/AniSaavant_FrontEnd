import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileselectionComponent } from './profileselection.component';

describe('ProfileselectionComponent', () => {
  let component: ProfileselectionComponent;
  let fixture: ComponentFixture<ProfileselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileselectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
