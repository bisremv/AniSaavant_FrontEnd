import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaHeroComponent } from './manga-hero.component';

describe('MangaHeroComponent', () => {
  let component: MangaHeroComponent;
  let fixture: ComponentFixture<MangaHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
