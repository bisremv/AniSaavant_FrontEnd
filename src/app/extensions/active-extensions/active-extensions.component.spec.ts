import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveExtensionsComponent } from './active-extensions.component';

describe('ActiveExtensionsComponent', () => {
  let component: ActiveExtensionsComponent;
  let fixture: ComponentFixture<ActiveExtensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveExtensionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveExtensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
