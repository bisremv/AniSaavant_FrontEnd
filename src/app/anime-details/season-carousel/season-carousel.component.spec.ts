import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonCarouselComponent } from './season-carousel.component';

describe('SeasonCarouselComponent', () => {
  let component: SeasonCarouselComponent;
  let fixture: ComponentFixture<SeasonCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
