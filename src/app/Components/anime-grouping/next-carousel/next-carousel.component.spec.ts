import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextCarouselComponent } from './next-carousel.component';

describe('NextCarouselComponent', () => {
  let component: NextCarouselComponent;
  let fixture: ComponentFixture<NextCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
