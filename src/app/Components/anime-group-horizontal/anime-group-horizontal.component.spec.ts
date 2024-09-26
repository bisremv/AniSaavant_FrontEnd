import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeGroupHorizontalComponent } from './anime-group-horizontal.component';

describe('AnimeGroupHorizontalComponent', () => {
  let component: AnimeGroupHorizontalComponent;
  let fixture: ComponentFixture<AnimeGroupHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeGroupHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeGroupHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
