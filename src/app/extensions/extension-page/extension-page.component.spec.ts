import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionPageComponent } from './extension-page.component';

describe('ExtensionPageComponent', () => {
  let component: ExtensionPageComponent;
  let fixture: ComponentFixture<ExtensionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtensionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
