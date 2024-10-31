import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeDisplayComponent } from './anime-display.component';

describe('AnimeDisplayComponent', () => {
  let component: AnimeDisplayComponent;
  let fixture: ComponentFixture<AnimeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
