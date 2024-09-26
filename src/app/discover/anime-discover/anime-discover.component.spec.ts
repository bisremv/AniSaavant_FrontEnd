import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeDiscoverComponent } from './anime-discover.component';

describe('AnimeDiscoverComponent', () => {
  let component: AnimeDiscoverComponent;
  let fixture: ComponentFixture<AnimeDiscoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeDiscoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
