import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaDetailHeroComponent } from './manga-detail-hero.component';

describe('MangaDetailHeroComponent', () => {
  let component: MangaDetailHeroComponent;
  let fixture: ComponentFixture<MangaDetailHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaDetailHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaDetailHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
