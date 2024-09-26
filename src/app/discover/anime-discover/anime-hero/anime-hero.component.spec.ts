import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeHeroComponent } from './anime-hero.component';

describe('AnimeHeroComponent', () => {
  let component: AnimeHeroComponent;
  let fixture: ComponentFixture<AnimeHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
