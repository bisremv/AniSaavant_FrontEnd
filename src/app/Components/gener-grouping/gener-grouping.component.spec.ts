import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerGroupingComponent } from './gener-grouping.component';

describe('GenerGroupingComponent', () => {
  let component: GenerGroupingComponent;
  let fixture: ComponentFixture<GenerGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerGroupingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
