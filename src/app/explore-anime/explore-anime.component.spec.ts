import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreAnimeComponent } from './explore-anime.component';

describe('ExploreAnimeComponent', () => {
  let component: ExploreAnimeComponent;
  let fixture: ComponentFixture<ExploreAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreAnimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
