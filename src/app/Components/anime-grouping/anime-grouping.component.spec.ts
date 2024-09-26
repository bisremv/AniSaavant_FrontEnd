import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeGroupingComponent } from './anime-grouping.component';

describe('AnimeGroupingComponent', () => {
  let component: AnimeGroupingComponent;
  let fixture: ComponentFixture<AnimeGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeGroupingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
