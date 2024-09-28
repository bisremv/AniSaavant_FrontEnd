import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioItemComponent } from './studio-item.component';

describe('StudioItemComponent', () => {
  let component: StudioItemComponent;
  let fixture: ComponentFixture<StudioItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
