import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeVideosComponent } from './anime-videos.component';

describe('AnimeVideosComponent', () => {
  let component: AnimeVideosComponent;
  let fixture: ComponentFixture<AnimeVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeVideosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
