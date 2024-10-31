import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionItemComponent } from './extension-item.component';

describe('ExtensionItemComponent', () => {
  let component: ExtensionItemComponent;
  let fixture: ComponentFixture<ExtensionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtensionItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
