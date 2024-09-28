import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeDetailHeroComponent } from './anime-detail-hero.component';

describe('AnimeDetailHeroComponent', () => {
  let component: AnimeDetailHeroComponent;
  let fixture: ComponentFixture<AnimeDetailHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeDetailHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeDetailHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
